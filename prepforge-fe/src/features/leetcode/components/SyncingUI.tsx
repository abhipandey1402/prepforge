import { useEffect, useState } from "react";
import InfiniteLoader from "./InfiniteLoader";

interface SyncProgress {
    progress: number;
    message: string;
    userId?: string;
}

const SyncingUI = ({ progress, status, isDarkMode }: { progress: SyncProgress; status: string; isDarkMode: boolean }) => {
    const [dots, setDots] = useState('');
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    // Tech quotes and tips
    const quotes = [
        "Code is poetry written in logic.",
        "First, solve the problem. Then, write the code.",
        "Clean code always looks like it was written by someone who cares.",
        "The best error message is the one that never shows up.",
        "Programming is thinking, not typing.",
        "Code never lies, comments sometimes do.",
        "Debugging is twice as hard as writing code.",
        "Simplicity is the ultimate sophistication.",
        "Make it work, make it right, make it fast.",
        "A good programmer is someone who looks both ways before crossing a one-way street.",
        "Talk is cheap. Show me the code.",
        "The computer was born to solve problems that did not exist before.",
        "Code for readability, optimize for performance.",
        "Every expert was once a beginner.",
        "Programming is learned by writing programs.",
        "The only way to go fast is to go well.",
        "Weeks of coding can save you hours of planning.",
        "It's not a bug, it's an undocumented feature.",
        "Good code is its own best documentation.",
        "Premature optimization is the root of all evil."
    ];

    // Animated dots effect
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => {
                if (prev === '...') return '';
                return prev + '.';
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    // Quote rotation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex(prev => (prev + 1) % quotes.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getStatusColor = () => {
        switch (status) {
            case 'success':
                return 'text-green-500';
            case 'failure':
                return 'text-red-500';
            default:
                return 'text-orange-500';
        }
    };

    const getProgressText = () => {
        if (status === 'success') return 'Complete!';
        if (status === 'failure') return 'Failed';

        const count = progress.progress;
        if (count === 0) return 'Starting...';
        if (count === 1) return '1 submission';
        return `${count} submissions`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className={`max-w-3xl w-full p-2 rounded-3xl ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-white to-gray-50'} shadow-2xl border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>

                {/* Rotating Quote */}
                <div className={`text-center mb-4 p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-gray-100/50'} backdrop-blur-sm`}>
                    <div className="text-sm opacity-60 mb-2">💡 Developer Wisdom</div>
                    <p className={`text-sm font-medium italic transition-all duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        "{quotes[currentQuoteIndex]}"
                    </p>
                </div>

                {/* Header */}
                <div className="text-center mb-4">
                    <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {status === 'fetching' ? 'Syncing Your Data' :
                            status === 'success' ? 'All Set!' :
                                'Sync Failed'}
                    </h2>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {status === 'fetching' ? 'Gathering your LeetCode journey' :
                            status === 'success' ? 'Your data is ready to explore' :
                                'Something went wrong during sync'}
                    </p>
                </div>

                {/* Progress Visualization */}
                <div className="mb-6">
                    {/* Submissions Counter */}
                    <div className="text-center mb-6">
                        <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                            <div className={`w-3 h-3 rounded-full ${status === 'fetching' ? 'bg-orange-500 animate-pulse' :
                                status === 'success' ? 'bg-green-500' : 'bg-red-500'
                                }`}></div>
                            <span className={`text-lg font-semibold ${getStatusColor()}`}>
                                {getProgressText()}
                            </span>
                        </div>
                    </div>

                    <InfiniteLoader />
                </div>

                {/* Status Message */}
                <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50/50'} mb-6 backdrop-blur-sm`}>
                    <div className="flex items-start space-x-4">
                        <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${status === 'fetching' ? 'bg-orange-500 animate-pulse' :
                            status === 'success' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                        <div className="flex-1">
                            <p className={`text-base font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                {progress.message}
                                {status === 'fetching' && (
                                    <span className="text-orange-500 ml-1">{dots}</span>
                                )}
                            </p>
                            {status === 'fetching' && (
                                <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    This may take a moment depending on your submission history
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Success Actions */}
                {status === 'success' && (
                    <div className="text-center">
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
                            <span>🎉</span>
                            <span className="text-sm font-medium">Ready to explore your data!</span>
                        </div>
                    </div>
                )}

                {/* Failure Actions */}
                {status === 'failure' && (
                    <div className="text-center space-y-4">
                        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-700'}`}>
                            <p className="text-sm">
                                Don't worry! This can happen due to network issues or high traffic.
                            </p>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            🔄 Retry Sync
                        </button>
                    </div>
                )}

                {/* Loading Animation Footer */}
                {status === 'fetching' && (
                    <div className="text-center mt-6">
                        <div className="flex justify-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-orange-400' : 'bg-orange-500'} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-orange-400' : 'bg-orange-500'} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-orange-400' : 'bg-orange-500'} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SyncingUI;