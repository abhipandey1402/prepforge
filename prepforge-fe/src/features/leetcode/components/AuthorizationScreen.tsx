import { Code, ExternalLink, BarChart3, TrendingUp, Target, Shield, AlertCircle } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";

interface AuthorizationScreenProps {
    onAuthorize: () => void;
    isDarkMode: boolean;
    isLoading?: boolean;
    error?: string | null;
}

const AuthorizationScreen: React.FC<AuthorizationScreenProps> = ({
    onAuthorize,
    isDarkMode,
    isLoading = false,
    error = null
}) => {
    const features = [
        {
            icon: <BarChart3 className="text-blue-500" size={20} />,
            title: "Advanced Analytics",
            description: "Detailed insights into your coding patterns and performance"
        },
        {
            icon: <TrendingUp className="text-green-500" size={20} />,
            title: "Progress Tracking",
            description: "Monitor your improvement over time with visual charts"
        },
        {
            icon: <Target className="text-purple-500" size={20} />,
            title: "Goal Setting",
            description: "Set and track your coding goals and milestones"
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-full w-full grid gap-8 items-center">
                {/* Left Column - Main Content */}
                <div className={`p-8 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-orange-100 rounded-full">
                                <Code className="text-orange-600" size={40} />
                            </div>
                        </div>
                        <h1 className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            PrepVerse Analytics Pro
                        </h1>
                        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Transform your coding journey with powerful insights and detailed progress tracking of Leetcode Submissions.
                        </p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className={`mb-6 p-4 rounded-lg border-l-4 border-red-500 ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                            <div className="flex items-start gap-3">
                                <AlertCircle className="text-red-500 mt-0.5" size={18} />
                                <div>
                                    <p className={`font-medium ${isDarkMode ? 'text-red-400' : 'text-red-800'}`}>
                                        Authorization Failed
                                    </p>
                                    <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-700'} mt-1`}>
                                        {error}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Features Grid */}
                    <div className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="mt-1">{feature.icon}</div>
                                <div>
                                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {feature.title}
                                    </h3>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Authorization Button */}
                    <button
                        onClick={onAuthorize}
                        disabled={isLoading}
                        className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 hover:shadow-xl transform hover:scale-[1.02]'
                            } text-white`}
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size={20} />
                                <span>Connecting...</span>
                            </>
                        ) : (
                            <>
                                <span>Connect Your LeetCode Account</span>
                                <ExternalLink size={20} />
                            </>
                        )}
                    </button>

                    {/* Loading Instructions */}
                    {isLoading && (
                        <div className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                            <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-800'} font-medium`}>
                                Please complete the login process in the browser window that just opened.
                            </p>
                            <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-700'} mt-2`}>
                                The window will close automatically after successful login.
                            </p>
                        </div>
                    )}

                    {/* Privacy Notice */}
                    <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} flex items-start gap-3`}>
                        <Shield className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} mt-0.5`} size={18} />
                        <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                                Your privacy is protected
                            </p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                                We only access your public submission data and never store your credentials.
                                All data remains on your device.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorizationScreen;