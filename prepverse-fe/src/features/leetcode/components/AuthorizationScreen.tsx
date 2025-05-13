import { ChevronRight, Code } from "lucide-react";

interface AuthorizationScreenProps {
    onAuthorize: () => void;
    isDarkMode: boolean;
}

const AuthorizationScreen: React.FC<AuthorizationScreenProps> = ({ onAuthorize, isDarkMode }) => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className={`max-w-md w-full p-8 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
                <div className="flex justify-center mb-6">
                    <Code className="text-orange-500" size={48} />
                </div>
                <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>LeetCode Dashboard</h1>
                <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Track your LeetCode progress with advanced analytics and visualization.
                </p>
                <button
                    onClick={onAuthorize}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full flex items-center justify-center gap-2"
                >
                    <span>Connect with LeetCode</span>
                    <ChevronRight size={16} />
                </button>
                <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    We only access your submission data to provide you with analytics.
                </p>
            </div>
        </div>
    );
}

export default AuthorizationScreen;