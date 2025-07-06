import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, persistor } from '@/store';
import { useGetCurrentUser } from './useGetCurrentUser';
import { useChangePassword } from './useChangePassword';
import { useUpdateUserData } from './useUpdateUserData';
import useTokenExpiry from '../../globalFeatures/hooks/useTokenExpiry';
import {
    FormData,
    EditingState,
    ShowPasswordsState,
    Notification
} from '../types/settings.types';
import {
    createNotification,
    validatePassword,
    validatePasswordMatch
} from '../utils/settings.utils';
import { logout } from '@/features/user/slices/authSlice';

export const useSettingsLogic = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { user: userData, loading, refetch } = useGetCurrentUser();
    const { changePassword, loading: passwordChangeLoading } = useChangePassword();
    const { updateUser } = useUpdateUserData();
    const { decodedToken } = useTokenExpiry(userData?.leetcodeSessionToken);

    const [editing, setEditing] = useState<EditingState>({
        username: false,
        fullName: false,
        email: false
    });

    const [showPasswords, setShowPasswords] = useState<ShowPasswordsState>({
        current: false,
        new: false,
        confirm: false
    });

    const [formData, setFormData] = useState<FormData>({
        username: '',
        fullName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (userData) {
            setFormData({
                username: userData.username,
                fullName: userData.fullName,
                email: userData.email,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        }
    }, [userData]);

    const addNotification = (message: string, type: Notification['type'] = 'info'): void => {
        const notification = createNotification(message, type);
        setNotifications(prev => [...prev, notification]);

        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== notification.id));
        }, 5000);
    };

    const handleEdit = (field: keyof EditingState): void => {
        setEditing(prev => ({ ...prev, [field]: true }));
    };

    const handleSave = async (field: keyof Pick<FormData, 'username' | 'fullName' | 'email'>): Promise<void> => {
        try {
            await updateUser({ [field]: formData[field] });
            await refetch();

            setEditing(prev => ({ ...prev, [field]: false }));
            addNotification(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`, 'success');
        } catch (error) {
            addNotification('Failed to update field', 'error');
        }
    };

    const handleCancel = (field: keyof Pick<FormData, 'username' | 'fullName' | 'email'>): void => {
        if (userData) {
            setFormData(prev => ({ ...prev, [field]: userData[field] }));
        }
        setEditing(prev => ({ ...prev, [field]: false }));
    };

    const handlePasswordChange = async (): Promise<void> => {
        const passwordError = validatePassword(formData.newPassword);
        if (passwordError) {
            addNotification(passwordError, 'error');
            return;
        }

        const matchError = validatePasswordMatch(formData.newPassword, formData.confirmPassword);
        if (matchError) {
            addNotification(matchError, 'error');
            return;
        }

        try {
            await changePassword({
                oldPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            addNotification("Password changed successfully!", 'success');
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
        } catch (error) {
            addNotification('Failed to change password', 'error');
        }
    };

    const handleResetPassword = (): void => {
        addNotification('Password reset email sent to your registered email!', 'info');
    };

    const handleLogout = () => {
        try {
            persistor.purge();
            dispatch(logout());
            navigate("/auth", { replace: true, state: { isFixed: true } });
            addNotification('Successfully logged out!', 'success');
        } catch (error) {
            addNotification('Logout failed', 'error');
        }
    };

    const togglePasswordVisibility = (field: keyof ShowPasswordsState): void => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const updateFormField = (field: keyof FormData, value: string): void => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isLeetcodeExpired = false;
    const refreshedTimestamp = decodedToken?.refreshed_at * 1000;
    const leetcodeRefreshedAt = refreshedTimestamp ? new Date(refreshedTimestamp) : null;

    return {
        // State
        userData,
        loading,
        passwordChangeLoading,
        editing,
        showPasswords,
        formData,
        notifications,
        isLeetcodeExpired,
        leetcodeRefreshedAt,

        // Actions
        handleEdit,
        handleSave,
        handleCancel,
        handlePasswordChange,
        handleResetPassword,
        handleLogout,
        togglePasswordVisibility,
        updateFormField,
        addNotification
    };
};