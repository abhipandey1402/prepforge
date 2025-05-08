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
            console.log(accessToken);
            navigate('/dashboard');
        }
    }, [accessToken]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-blue-950">
            <AuthForm />
        </div>
    );
};

export default AuthPage;
