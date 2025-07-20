import React, { useState } from 'react';
import { 
    ExternalLink, 
    Calendar, 
    User, 
    // LogOut, 
    // RefreshCw,
    AlertCircle,
    CheckCircle,
    Loader
} from 'lucide-react';
import { useLeetCodeAuth } from '../../globalFeatures/hooks/useLeetCodeAuth';
import { formatDate } from '../utils/settings.utils';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setCurrentItem } from '@/features/globalFeatures/slices/configSlice';
import { useSelector } from 'react-redux';

interface LeetCodeSectionProps {
leetcodeRefreshedAt: Date | any;
isDarkMode: boolean;
}

const LeetCodeSection: React.FC<LeetCodeSectionProps> = ({leetcodeRefreshedAt, isDarkMode}) => {
    const {
        isLoading,
        // isAuthorizing,
        error,
        // authorize,
        // logout,
        clearError,
    } = useLeetCodeAuth();
    const leetcodeToken = useSelector((state: RootState) => state.auth?.userData?.user?.leetcodeSessionToken);
    const [isAuthenticated] = useState(leetcodeToken ? true : false);

    const dispatch = useDispatch<AppDispatch>();

    // const handleAuthorize = async () => {
    //     try {
    //         await authorize();
    //     } catch (error) {
    //         console.error('Authorization failed:', error);
    //     }
    // };

    // const handleLogout = () => {
    //     logout();
    // };

    // const handleRefresh = async () => {
    //     try {
    //         await authorize();
    //     } catch (error) {
    //         console.error('Refresh failed:', error);
    //     }
    // };

    const handleNavigateDashboard = async () => {
        dispatch(setCurrentItem('submissions'))
    }

    return (
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-6 mb-6`}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <ExternalLink className="w-6 h-6 text-orange-500" />
                LeetCode Integration
            </h2>

            {/* Loading State */}
            {isLoading && (
                <div className="bg-gray-700 p-4 rounded-lg mb-4 flex items-center justify-center">
                    <Loader className="w-5 h-5 animate-spin text-orange-500 mr-2" />
                    <span className="text-gray-300">Checking connection status...</span>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg mb-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-red-400 font-medium">Connection Error</p>
                            <p className="text-red-300 text-sm mt-1">{error}</p>
                            <button
                                onClick={clearError}
                                className="text-red-400 hover:text-red-300 text-sm underline mt-2"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && (
                <>
                    {/* Authorization Status */}
                    <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-slate-200'} p-4 rounded-lg mb-4`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Connection Status</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                                isAuthenticated 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-red-600 text-white'
                            }`}>
                                {isAuthenticated ? (
                                    <>
                                        <CheckCircle className="w-3 h-3" />
                                        Connected
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="w-3 h-3" />
                                        Not Connected
                                    </>
                                )}
                            </span>
                        </div>

                        {isAuthenticated && (
                            <div className="space-y-2 mt-3">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-orange-500" />
                                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-sm`}>
                                        Connected as: <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-medium`}>Abhi Pandey</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-orange-500" />
                                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-sm `}>
                                        Last Refreshed At: {formatDate(leetcodeRefreshedAt && leetcodeRefreshedAt?.toString())}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    {/* <div className="flex flex-wrap gap-3">
                        {!isAuthenticated ? (
                            <button
                                onClick={handleAuthorize}
                                disabled={isAuthorizing}
                                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded transition-colors flex items-center gap-2"
                            >
                                {isAuthorizing ? (
                                    <>
                                        <Loader className="w-4 h-4 animate-spin" />
                                        Connecting...
                                    </>
                                ) : (
                                    <>
                                        <ExternalLink className="w-4 h-4" />
                                        Connect Your LeetCode Account
                                    </>
                                )}
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleRefresh}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh Connection
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Revoke Connection
                                </button>
                            </>
                        )}
                    </div> */}

                    {/* Additional Info */}
                    {isAuthenticated && (
                        <div className={`mt-4 p-3 ${isDarkMode ? 'bg-gray-700/50' : 'bg-white text-gray-800'} rounded-lg`}>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                Your LeetCode data is synced and up to date. 
                                <button 
                                    onClick={handleNavigateDashboard}
                                    className="text-orange-400 hover:text-orange-300 underline ml-1"
                                >
                                    View Dashboard
                                </button>
                            </p>
                        </div>
                    )}

                    {!isAuthenticated && (
                        <div className="mt-4 p-3 bg-orange-900/20 border border-orange-600 rounded-lg">
                            <p className="text-xs text-orange-300 flex items-start gap-2">
                                <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                Connect your LeetCode account to track your progress, analyze your performance, and get detailed insights into your coding journey.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LeetCodeSection;