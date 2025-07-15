import { useSelector } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const AuthPage = () => {
    const accessToken = useSelector((state: RootState) => state.auth?.userData?.accessToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate('/dashboard');
        }
    }, [accessToken]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-white to-white">
            <AuthForm />
        </div>
    );
};

export default AuthPage;
