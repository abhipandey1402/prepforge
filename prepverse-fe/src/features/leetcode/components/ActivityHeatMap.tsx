// components/ActivityHeatmap.tsx
interface ActivityHeatmapProps {
    submissions: any[];
    isDarkMode: boolean;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ submissions, isDarkMode }) => {
    // Generate activity data for the last 365 days
    const generateActivityData = () => {
        const today = new Date();
        const data = [];
        
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            // Count submissions for this date
            const dateStr = date.toISOString().split('T')[0];
            const submissionCount = 0;
            // submissions?.filter(sub => 
            //     sub.timestamp?.startsWith(dateStr)
            // ).length || 0;
            
            data.push({
                date: dateStr,
                count: submissionCount,
                level: submissionCount === 0 ? 0 : Math.min(4, Math.ceil(submissionCount / 2))
            });
        }
        
        return data;
    };

    const activityData = generateActivityData();

    const getColorClass = (level: number) => {
        if (isDarkMode) {
            switch (level) {
                case 0: return 'bg-slate-800';
                case 1: return 'bg-green-900';
                case 2: return 'bg-green-700';
                case 3: return 'bg-green-500';
                case 4: return 'bg-green-400';
                default: return 'bg-slate-800';
            }
        } else {
            switch (level) {
                case 0: return 'bg-gray-100';
                case 1: return 'bg-green-200';
                case 2: return 'bg-green-300';
                case 3: return 'bg-green-500';
                case 4: return 'bg-green-600';
                default: return 'bg-gray-100';
            }
        }
    };

    return (
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Activity Heatmap
            </h3>
            <div className="overflow-x-auto">
                <div className="grid grid-cols-53 gap-1 min-w-max">
                    {activityData.map((day, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-sm ${getColorClass(day.level)}`}
                            title={`${day.date}: ${day.count} submissions`}
                        ></div>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Less
                    </span>
                    <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map(level => (
                            <div key={level} className={`w-3 h-3 rounded-sm ${getColorClass(level)}`}></div>
                        ))}
                    </div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        More
                    </span>
                </div>
            </div>
        </div>
    );
};