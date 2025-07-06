// components/ProgressSection.tsx
import { Trophy, Target, Calendar, TrendingUp } from 'lucide-react';

interface ProgressSectionProps {
    stats: any;
    isDarkMode: boolean;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({ stats, isDarkMode }) => {
    const progressMetrics = [
        {
            icon: <Trophy className="text-yellow-500" size={24} />,
            title: "Current Streak",
            value: stats?.streak || 0,
            suffix: "days",
            color: "yellow"
        },
        {
            icon: <Target className="text-blue-500" size={24} />,
            title: "Acceptance Rate",
            value: stats?.acceptanceRate || 0,
            suffix: "%",
            color: "blue"
        },
        {
            icon: <Calendar className="text-green-500" size={24} />,
            title: "Global Ranking",
            value: stats?.ranking || "N/A",
            suffix: "",
            color: "green"
        },
        {
            icon: <TrendingUp className="text-purple-500" size={24} />,
            title: "Total Solved",
            value: stats?.totalSolved || 0,
            suffix: "problems",
            color: "purple"
        }
    ];

    return (
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Progress Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {progressMetrics.map((metric, index) => (
                    <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            {metric.icon}
                            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {metric.title}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {metric.value}
                            </span>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {metric.suffix}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};