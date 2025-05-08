import { AppDispatch } from '@/store';
import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { performLogin, performRegistration } from '../slices/authSlice';
import { useNavigate } from 'react-router';

const useAuthForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const Navigate = useNavigate();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const toggleAuthMode = () => setIsLogin((prev) => !prev);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warning('Email and Password are required.');
            return;
        }

        try {
            if (isLogin) {
                const result = await dispatch(performLogin({ email, password })).unwrap();
                if (result) {
                    toast.success("Login successfull!");
                    Navigate("/dashboard");
                    setEmail('');
                    setPassword('');
                }
            } else {
                if (!fullName || !username) {
                    toast.warning("Full Name and Username are required for registration.");
                    return;
                }

                if (password !== confirmPassword) {
                    toast.warning('Passwords do not match.');
                    return;
                }

                const result = await dispatch(performRegistration({ fullName, email, username, password })).unwrap();
                if (result) {
                    toast.success('Registration successfull!');
                    Navigate("/dashboard");
                    setFullName('');
                    setEmail('');
                    setUsername('');
                    setPassword('');
                    setConfirmPassword('');
                }
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'An error occurred. Please try again.');
        }
    };

    return {
        isLogin,
        fullName,
        email,
        username,
        password,
        confirmPassword,
        setFullName,
        setEmail,
        setUsername,
        setPassword,
        setConfirmPassword,
        toggleAuthMode,
        handleSubmit,
    };
};

export default useAuthForm;
