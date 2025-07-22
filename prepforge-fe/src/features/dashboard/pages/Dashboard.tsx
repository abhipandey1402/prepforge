import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { setCurrentItem } from "@/features/globalFeatures/slices/configSlice";
import LeetcodeSubmissions from "@/features/leetcode/pages/LeetcodeSubmissions";
import LeetcodeProblems from "@/features/leetcode/pages/LeetcodeProblems";
// import ChatPage from "@/features/chat/pages/ChatPage";
import SettingsPage from "@/features/settings/index"

const Dashboard = () => {
    const currentItem = useSelector((state: RootState) => state.config?.currentItem);
    const isDarkMode = useSelector((state: RootState) => state.config?.isDarkTheme);
    const dispatch = useDispatch();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Handle page reloads
        const handleBeforeUnload = (event: any) => {
            if (event.currentTarget.performance.navigation.type === 1) {
                dispatch(setCurrentItem("submissions"));
            }
        };
        window.addEventListener("load", handleBeforeUnload);

        // Handle mobile detection
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("load", handleBeforeUnload);
            window.removeEventListener("resize", handleResize);
        };
    }, [dispatch]);

    const renderCurrentContent = () => {
        switch (currentItem) {
            case "submissions":
                return <LeetcodeSubmissions isDarkMode={isDarkMode} />;
            case "practice":
                return <LeetcodeProblems isDarkMode={isDarkMode} />;
            // case "chats":
            // return <ChatPage isDarkMode={isDarkMode} />
            case "challengebetting":
                return <span>Challenge Betting</span>
            case "achievements":
                return <span>Achievements</span>
            case "notifications":
                return <span>Notifications</span>
            case "settings":
                return <SettingsPage isDarkMode={isDarkMode} />
            default:
                return null;
        }
    }

    if (isMobile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-950/20 to-orange-600/70 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-950/20 to-orange-600/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 max-w-md w-full">
                    {/* Main card */}
                    <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-300">
                        {/* Icon with animation */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-950/40 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                    <img src="https://res.cloudinary.com/dbzi19ec6/image/upload/v1752592047/icon128_vsu3tt.png" alt="prepforge-logo" className="rounded-full w-[100%]"/>
                                </div>
                                {/* Pulsing ring */}
                                <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-orange-400/30 animate-ping"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-center space-y-4">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-950/40 to-orange-600 bg-clip-text text-transparent">
                                Best on Desktop
                            </h1>

                            <p className="text-gray-700 text-lg leading-relaxed">
                                Our dashboard is crafted for the full desktop experience with rich interactions and detailed views.
                            </p>

                            {/* Feature highlights */}
                            <div className="grid grid-cols-1 gap-3 mt-6 text-sm">
                                <div className="flex items-center justify-center space-x-2 text-gray-600">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                    <span>Complex data visualizations</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 text-gray-600">
                                    <div className="w-2 h-2 bg-blue-950 rounded-full"></div>
                                    <span>Chrome Extension</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 text-gray-600">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span>Multi-panel layouts</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 text-gray-600">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <span>Keyboard shortcuts</span>
                                </div>
                            </div>

                            {/* Call to action */}
                            <div className="pt-4">
                                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-950/80 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Switch to Desktop</span>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mt-4">
                                We're working on a mobile-optimized version
                            </p>
                        </div>
                    </div>

                    {/* Bottom decorative element */}
                    <div className="flex justify-center mt-8">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-400"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full ${isDarkMode ? 'bg-slate-600' : 'bg-slate-200'} flex box-border`} style={{ minHeight: 'calc(100vh)' }} >
            <Sidebar isDarkMode={isDarkMode} />
            <div style={{ width: 'calc(100vw - 15rem)', height: 'calc(100vh - 1rem)' }} className={`ml-56 mr-1 mt-2 mb-2 rounded-2xl ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'} text-white fixed`}>
                <div className="h-full overflow-y-auto custom-scrollbar">
                    {renderCurrentContent()}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;