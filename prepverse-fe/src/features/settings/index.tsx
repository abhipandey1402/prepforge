import React from 'react';
import { useSettingsLogic } from './hooks/useSettingsLogic';
import NotificationToast from './components/NotificationToast';
import LoadingSpinner from './components/LoadingSpinner';
import ProfileSection from './components/ProfileSection';
import AccountDetailsSection from './components/AccountDetailsSection';
import SecuritySection from './components/SecuritySection';
import LeetCodeSection from './components/LeetCodeSection';
import ActionsSection from './components/ActionsSection';

const SettingsPage: React.FC = () => {

    const {
        // State
        userData,
        loading,
        passwordChangeLoading,
        editing,
        showPasswords,
        formData,
        notifications,
        leetcodeRefreshedAt,

        // Actions
        handleEdit,
        handleSave,
        handleCancel,
        handlePasswordChange,
        handleLogout,
        togglePasswordVisibility,
        updateFormField
    } = useSettingsLogic();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!userData) {
        return (
            <div className="min-h-screen bg-transparent text-white p-6 flex items-center justify-center">
                <span className="text-lg">No user data available</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-white p-6">
            {/* Notifications */}
            {notifications.map(notification => (
                <NotificationToast key={notification.id} notification={notification} />
            ))}

            <div className="max-w-4xl mx-auto">
                <ProfileSection
                    userData={userData}
                    formData={formData}
                    editing={editing}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onFormChange={updateFormField}
                />

                <AccountDetailsSection userData={userData} />

                <SecuritySection
                    formData={formData}
                    showPasswords={showPasswords}
                    passwordChangeLoading={passwordChangeLoading}
                    onFormChange={updateFormField}
                    onTogglePasswordVisibility={togglePasswordVisibility}
                    onPasswordChange={handlePasswordChange}
                />

                <LeetCodeSection
                    leetcodeRefreshedAt={leetcodeRefreshedAt}
                />

                <ActionsSection onLogout={handleLogout} />
            </div>
        </div>
    );
};

export default SettingsPage;