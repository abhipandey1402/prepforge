import React, { useState } from "react";
import ForgeIQLearnMore from "./ForgeIQLearnMore";

interface ForgeIQComingSoonProps {
    isDarkMode: boolean;
}

const ForgeIQComingSoon: React.FC<ForgeIQComingSoonProps> = ({ isDarkMode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLearnMoreClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div
            className={`relative w-full h-screen rounded-2xl overflow-hidden transition-colors duration-500 ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"
                }`}
        >
            <div
                className={`absolute inset-0 bg-cover bg-center backdrop-blur-md transition-all duration-500 ${isDarkMode ? "bg-slate-800/30" : "bg-gray-200/50"
                    }`}
            />

            {/* Overlay Card */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                    className={`rounded-xl p-8 max-w-md w-full text-center shadow-xl backdrop-blur-lg border transition-all duration-500 ${isDarkMode
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-white/80 border-gray-300 text-gray-900"
                        }`}
                >
                    <h2 className="text-3xl font-semibold mb-4">🚀 ForgeIQ is Almost Here!</h2>
                    <p className="text-base mb-4">
                        AI-powered topic insights based on your LeetCode submission history.
                    </p>
                    <p
                        className={`text-lg mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        📅 Dropping this September 2025. <br/> 🔔 Stay tuned for the drop!
                    </p>

                    <div className="flex justify-center gap-4 flex-wrap">
                        <button
                            onClick={handleLearnMoreClick}
                            className={`border font-medium py-2 px-4 rounded-md transition ${isDarkMode
                                ? "bg-orange-500 border-white/30 hover:border-white text-white"
                                : "bg-orange-500 border-gray-400 hover:border-gray-600 text-white"
                                }`}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div
                        className={`relative w-[90vw] max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-2xl ${isDarkMode ? "bg-slate-800 text-white" : "bg-white text-gray-900"}`}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-xl font-bold hover:text-red-500"
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                        <ForgeIQLearnMore isDarkMode={isDarkMode} />
                    </div>
                </div>
            )}

        </div>
    );
};

export default ForgeIQComingSoon;
