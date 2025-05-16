import React from 'react';
import { Progress } from "@/components/ui/progress"; // using shadcn/ui

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    detail: string;
    isDarkMode: boolean;
    showDifficultyBreakdown?: boolean; // New optional prop
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    icon,
    detail,
    isDarkMode,
    showDifficultyBreakdown = false,
}) => {
    // Extract difficulty values from detail string: "123 Easy, 456 Medium, 789 Hard"
    const getDifficultyStats = (detail: string) => {
        const match = detail.match(/(\d+)\sEasy.*?(\d+)\sMedium.*?(\d+)\sHard/i);
        if (!match) return null;

        const easy = parseInt(match[1]);
        const medium = parseInt(match[2]);
        const hard = parseInt(match[3]);
        const total = easy + medium + hard;

        return { easy, medium, hard, total };
    };

    const difficultyStats = showDifficultyBreakdown ? getDifficultyStats(detail) : null;

    return (
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg transition-transform transform hover:scale-105 duration-300`}>
            <div className="flex justify-between items-start">
                <div className="w-full">
                    <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
                    <div className="flex items-end gap-2 mb-2">
                        <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{value}</p>
                        {!showDifficultyBreakdown && (
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{detail}</p>
                        )}
                    </div>

                    {showDifficultyBreakdown && difficultyStats && (
                        <div className="space-y-0.5">
                            <div className="flex justify-between text-xs">
                                <span className="text-green-400">Easy</span>
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{difficultyStats.easy}</span>
                            </div>
                            <Progress value={(difficultyStats.easy / difficultyStats.total) * 100} className="h-2 bg-green-400" />

                            <div className="flex justify-between text-xs pt-2">
                                <span className="text-yellow-400">Medium</span>
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{difficultyStats.medium}</span>
                            </div>
                            <Progress value={(difficultyStats.medium / difficultyStats.total) * 100} className="h-2 bg-yellow-400" />

                            <div className="flex justify-between text-xs pt-2">
                                <span className="text-red-500">Hard</span>
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{difficultyStats.hard}</span>
                            </div>
                            <Progress value={100 - ((difficultyStats.hard / difficultyStats.total) * 100)} className="h-2 bg-red-400" />
                        </div>
                    )}
                </div>

                <div className={`p-3 rounded-lg ml-4 ${isDarkMode ? 'bg-slate-800 text-orange-500' : 'bg-orange-100 text-orange-600'}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
