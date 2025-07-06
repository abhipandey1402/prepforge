import React, { useState, useEffect } from 'react';

// Chrome Extension API types
declare global {
    interface Window {
        chrome?: {
            runtime?: {
                sendMessage: (
                    message: any,
                    callback?: (response: any) => void
                ) => void;
                lastError?: {
                    message: string;
                };
            };
        };
    }
}
import {
    Code,
    ExternalLink,
    Shield,
    AlertCircle,
    Download,
    Chrome,
    CheckCircle,
    RefreshCw,
    Globe,
    Zap
} from "lucide-react";

// Mock LoadingSpinner component
const LoadingSpinner = ({ size = 20 }: { size?: number }) => (
    <RefreshCw className="animate-spin" size={size} />
);

interface ExtensionAuthScreenProps {
    jwt?: string;
    token: string | null;
    isAuthenticated: boolean;
    isDarkMode?: boolean;
}

const ExtensionAuthScreen: React.FC<ExtensionAuthScreenProps> = ({
    jwt,
    token,
    isAuthenticated,
    isDarkMode = true,
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isConnecting, setIsConnecting] = useState(false);
    const [_, setIsExtensionConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sessionReceived, setSessionReceived] = useState(false);

    const steps = [
        {
            title: "Install Extension",
            description: "Download and install our Chrome extension",
            icon: <Download className="text-blue-500" size={24} />,
            action: "install"
        },
        {
            title: "Connect Extension",
            description: "Connect the extension to your PrepVerse account",
            icon: <Chrome className="text-orange-500" size={24} />,
            action: "connect"
        },
        {
            title: "Login to LeetCode",
            description: "Sign in to your LeetCode account in a new tab",
            icon: <Globe className="text-green-500" size={24} />,
            action: "login"
        },
        {
            title: "Sync Data",
            description: "Open the extension and click 'Send Session Token'",
            icon: <Zap className="text-purple-500" size={24} />,
            action: "sync"
        }
    ];


    const extensionId = "cgicljmoffojpnmdfdcejfackckfbffn";

    const handleConnectExtension = () => {
        if (!jwt) {
            setError("❌ User authentication token not found.");
            return;
        }

        setIsConnecting(true);
        setError(null);

        try {
            // Check if chrome.runtime is available
            const chromeApi = (window as any).chrome;
            if (typeof chromeApi === 'undefined' || !chromeApi?.runtime) {
                setError("❌ Chrome extension API not available. Please make sure you're using Chrome browser.");
                setIsConnecting(false);
                return;
            }

            console.log("Attempting to connect to extension:", extensionId);
            console.log("Sending JWT:", jwt);

            chromeApi.runtime.sendMessage(
                extensionId,
                {
                    action: "store_jwt",
                    jwt,
                    timestamp: Date.now()
                },
                (response: any) => {
                    console.log("Extension response:", response);
                    console.log("Chrome runtime error:", chromeApi.runtime.lastError);

                    setIsConnecting(false);

                    if (chromeApi.runtime.lastError) {
                        const errorMsg = chromeApi.runtime.lastError.message;
                        console.error("Chrome error details:", errorMsg);

                        if (errorMsg.includes("Could not establish connection")) {
                            setError("❌ Extension not found or not running. Please check:\n• Extension is installed and enabled\n• Extension ID is correct\n• Page is refreshed after extension installation");
                        } else if (errorMsg.includes("Invalid extension id")) {
                            setError("❌ Invalid extension ID. Please verify the extension is properly installed.");
                        } else {
                            setError(`❌ Extension connection failed: ${errorMsg}`);
                        }
                        return;
                    }

                    if (response?.success) {
                        console.log("Extension connected successfully");
                        setIsExtensionConnected(true);
                        setCurrentStep(2);
                        setError(null);
                    } else {
                        const errorMsg = response?.error || "Unknown error occurred";
                        console.error("Extension response error:", errorMsg);
                        setError(`❌ Extension rejected connection: ${errorMsg}`);
                    }
                }
            );

            // Add timeout handling
            setTimeout(() => {
                if (isConnecting) {
                    setIsConnecting(false);
                    setError("❌ Connection timeout. Please ensure:\n• Extension is installed and running\n• Extension has proper permissions\n• Try refreshing the page");
                }
            }, 10000); // 10 second timeout

        } catch (err: any) {
            setIsConnecting(false);
            console.error("Extension connection error:", err);
            setError(`❌ Unexpected error: ${err.message || "Please ensure the extension is installed and enabled."}`);
        }
    };

    const handleInstallExtension = () => {
        // In a real app, this would open the Chrome Web Store
        window.open('https://chrome.google.com/webstore', '_blank');
        setCurrentStep(1);
    };

    const handleLoginLeetCode = () => {
        window.open('https://leetcode.com/accounts/login/', '_blank');
        setCurrentStep(3);
    };

    const handleRefreshConnection = () => {
        setError(null);
        setIsConnecting(false);
        setIsExtensionConnected(false);
    };

    // Mock session token reception
    useEffect(() => {
        if (currentStep === 3 && token && isAuthenticated) {
            setSessionReceived(true);
        }
    }, [currentStep, token, isAuthenticated]);

    const StepIndicator = ({ stepIndex, isActive, isCompleted }: { stepIndex: number, isActive: boolean, isCompleted: boolean }) => (
        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${isCompleted
            ? 'bg-green-500 border-green-500 text-white'
            : isActive
                ? 'border-orange-500 bg-orange-500 text-white'
                : isDarkMode
                    ? 'border-gray-600 text-gray-400'
                    : 'border-gray-300 text-gray-500'
            }`}>
            {isCompleted ? <CheckCircle size={16} /> : stepIndex + 1}
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full flex flex-col gap-4 items-start">
                {/* Left Column - Main Content */}
                <div className={`p-4 w-full rounded-2xl shadow-xl ${isDarkMode ? 'bg-slate-900 border border-gray-700' : 'bg-white border border-gray-100'}`}>
                    <div className="text-center mb-4">
                        <div className="flex justify-center mb-2">
                            <div className="p-2 bg-orange-100 rounded-full">
                                <Code className="text-orange-600" size={32} />
                            </div>
                        </div>
                        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Connect via Chrome Extension for seamless LeetCode data sync
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <div className={`flex items-center gap-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                <span>⚡</span>
                                <span>Quick 3-minute setup</span>
                            </div>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                            <div className={`flex items-center gap-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                <span>🔒</span>
                                <span>Secure & Private</span>
                            </div>
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className={`mb-6 p-4 rounded-lg border-l-4 border-red-500 ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                            <div className="flex items-start gap-3">
                                <AlertCircle className="text-red-500 mt-0.5" size={18} />
                                <div className="flex-1">
                                    <p className={`font-medium ${isDarkMode ? 'text-red-400' : 'text-red-800'}`}>
                                        Connection Error
                                    </p>
                                    <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-700'} mt-1`}>
                                        {error}
                                    </p>
                                </div>
                                <button
                                    onClick={handleRefreshConnection}
                                    className={`text-red-500 hover:text-red-600 transition-colors`}
                                >
                                    <RefreshCw size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {sessionReceived && (
                        <div className={`mb-6 p-4 rounded-lg border-l-4 border-green-500 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-0.5" size={18} />
                                <div>
                                    <p className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-800'}`}>
                                        Successfully Connected!
                                    </p>
                                    <p className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'} mt-1`}>
                                        Your LeetCode session has been synced. Redirecting to dashboard...
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Setup Steps */}
                <div className={`p-8 w-full rounded-2xl shadow-xl ${isDarkMode ? 'bg-slate-900 border border-gray-700' : 'bg-white border border-gray-100'}`}>
                    <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Setup Guide
                    </h2>

                    {/* Step Progress */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            {steps.map((_, index) => (
                                <React.Fragment key={index}>
                                    <StepIndicator
                                        stepIndex={index}
                                        isActive={currentStep === index}
                                        isCompleted={currentStep > index || (index === 3 && sessionReceived)}
                                    />
                                    {index < steps.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-2 ${currentStep > index ? 'bg-green-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                                            }`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div key={index} className={`p-4 rounded-lg border transition-all duration-300 ${currentStep === index
                                ? isDarkMode
                                    ? 'border-orange-500 bg-orange-900/20'
                                    : 'border-orange-500 bg-orange-50'
                                : currentStep > index || (index === 3 && sessionReceived)
                                    ? isDarkMode
                                        ? 'border-green-500 bg-green-900/20'
                                        : 'border-green-500 bg-green-50'
                                    : isDarkMode
                                        ? 'border-gray-600 bg-gray-700/30'
                                        : 'border-gray-200 bg-gray-50'
                                }`}>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">{step.icon}</div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                            {step.title}
                                        </h3>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                                            {step.description}
                                        </p>

                                        {/* Action Buttons */}
                                        {currentStep === index && (
                                            <div className="mt-3">
                                                {step.action === 'install' && (
                                                    <button
                                                        onClick={handleInstallExtension}
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                                    >
                                                        <Download size={16} />
                                                        Install Extension
                                                        <ExternalLink size={14} />
                                                    </button>
                                                )}
                                                {step.action === 'connect' && (
                                                    <button
                                                        onClick={handleConnectExtension}
                                                        disabled={isConnecting}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isConnecting
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-orange-600 hover:bg-orange-700'
                                                            } text-white`}
                                                    >
                                                        {isConnecting ? (
                                                            <>
                                                                <LoadingSpinner size={16} />
                                                                Connecting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Chrome size={16} />
                                                                Connect Extension
                                                            </>
                                                        )}
                                                    </button>
                                                )}
                                                {step.action === 'login' && (
                                                    <button
                                                        onClick={handleLoginLeetCode}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                                    >
                                                        <Globe size={16} />
                                                        Open LeetCode
                                                        <ExternalLink size={14} />
                                                    </button>
                                                )}
                                                {step.action === 'sync' && (
                                                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
                                                        <p className={`text-sm ${isDarkMode ? 'text-purple-400' : 'text-purple-800'} font-medium mb-2`}>
                                                            Final Step:
                                                        </p>
                                                        <ol className={`text-xs ${isDarkMode ? 'text-purple-300' : 'text-purple-700'} space-y-1`}>
                                                            <li>1. Click the extension icon in your browser toolbar</li>
                                                            <li>2. Click "Send Session Token" button</li>
                                                            <li>3. Wait for automatic sync completion</li>
                                                        </ol>
                                                        {sessionReceived && (
                                                            <div className="flex items-center gap-2 mt-2 text-green-600">
                                                                <CheckCircle size={16} />
                                                                <span className="text-sm font-medium">Session received!</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {(currentStep > index || (index === 3 && sessionReceived)) && (
                                        <CheckCircle className="text-green-500 mt-1" size={20} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Privacy Notice */}
                    <div className={`mt-6 w-full p-0 rounded-lg flex flex-col items-center gap-0 `}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium flex gap-2 items-center`}>
                            <Shield className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} mt-0.5`} size={16} />Your privacy is protected
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                            We only access your public submission data through the secure extension.
                            All data remains on your device.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtensionAuthScreen;