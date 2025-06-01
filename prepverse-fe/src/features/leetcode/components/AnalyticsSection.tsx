// components/AnalyticsSection.tsx
import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';

interface AnalyticsSectionProps {
    submissions: any[];
    stats: any;
    isDarkMode: boolean;
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ submissions, stats, isDarkMode }) => {
    console.log(submissions?.length);
    const analyticsCards = [
        {
            icon: <BarChart3 className="text-blue-500" size={24} />,
            title: "Difficulty Distribution",
            value: "Balanced",
            description: `Easy: ${stats?.easySolved || 0}, Medium: ${stats?.mediumSolved || 0}, Hard: ${stats?.hardSolved || 0}`,
            color: "blue"
        },
        {
            icon: <TrendingUp className="text-green-500" size={24} />,
            title: "Weekly Progress",
            value: "+12%",
            description: "Improvement from last week",
            color: "green"
        },
        {
            icon: <PieChart className="text-purple-500" size={24} />,
            title: "Language Usage",
            value: "Python",
            description: "Most used programming language",
            color: "purple"
        },
        {
            icon: <Calendar className="text-orange-500" size={24} />,
            title: "Best Streak",
            value: `${stats?.streak || 0} days`,
            description: "Your longest solving streak",
            color: "orange"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsCards.map((card, index) => (
                <div key={index} className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
                    <div className="flex items-center gap-3 mb-3">
                        {card.icon}
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {card.title}
                        </h3>
                    </div>
                    <div className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {card.value}
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {card.description}
                    </p>
                </div>
            ))}
        </div>
    );
};