import axiosClient from '@/interceptors/axiosClient';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight, RefreshCw } from 'lucide-react';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [message, setMessage] = useState('');
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            axiosClient.get(`/users/verify-email?token=${token}`)
                .then((res) => {
                    setStatus('success');
                    setMessage(res.data.message);
                })
                .catch((err) => {
                    setStatus('error');
                    setMessage(err.response?.data?.message || 'Verification failed.');
                });
        } else {
            setStatus('error');
            setMessage('No token provided.');
        }
    }, [searchParams]);

    const handleResend = async () => {
        setIsResending(true);
        // Simulate API call
        setTimeout(() => {
            setMessage('Verification email sent! Please check your inbox.');
            setIsResending(false);
        }, 1500);
    };

    const handleLogin = () => {
        navigate("/auth");
    };

    const getStatusConfig = () => {
        switch (status) {
            case 'pending':
                return {
                    icon: <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />,
                    title: 'Verifying Email',
                    subtitle: 'Please wait while we verify your email address...',
                    bgColor: 'bg-orange-50',
                    borderColor: 'border-orange-200'
                };
            case 'success':
                return {
                    icon: <CheckCircle className="w-16 h-16 text-green-500" />,
                    title: 'Email Verified!',
                    subtitle: 'Your account is now active and ready to use.',
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200'
                };
            case 'error':
                return {
                    icon: <XCircle className="w-16 h-16 text-red-500" />,
                    title: 'Verification Failed',
                    subtitle: 'We couldn\'t verify your email address.',
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-200'
                };
        }
    };

    const config = getStatusConfig();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className={`bg-white rounded-2xl shadow-xl border-2 ${config.borderColor} p-8 text-center transition-all duration-300`}>
                    <div className={`w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300`}>
                        {config.icon}
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {config.title}
                    </h1>

                    <p className="text-gray-600 mb-6">
                        {config.subtitle}
                    </p>

                    {message && (
                        <div className={`p-4 rounded-lg mb-6 ${status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                            }`}>
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                    )}

                    <div className="space-y-3">
                        {status === 'success' && (
                            <button
                                onClick={handleLogin}
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Continue to Login
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}

                        {status === 'error' && (
                            <>
                                <button
                                    onClick={handleResend}
                                    disabled={isResending}
                                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-lg"
                                >
                                    {isResending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="w-4 h-4" />
                                            Resend Verification
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleLogin}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                                >
                                    Back to Login
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        Check your spam folder if you don't see the email
                    </p>
                </div>
            </div>
        </div>
    );
}