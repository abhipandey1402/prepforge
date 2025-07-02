interface ActivityHeatmapProps {
    submissionCalendar: string | any; // JSON string containing timestamp: count pairs
    isDarkMode: boolean;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ submissionCalendar, isDarkMode }) => {
    const generateActivityData = () => {
        const today = new Date();
        const data = [];
        
        // Parse the submission calendar data
        let submissionData: Record<string, number> = {};
        try {
            submissionData = JSON.parse(submissionCalendar || '{}');
        } catch (error) {
            console.error('Error parsing submission calendar:', error);
        }
        
        // Convert calendar data timestamps to normalized (midnight) timestamps
        const normalizedSubmissionData: Record<string, number> = {};
        Object.entries(submissionData).forEach(([timestamp, count]) => {
            // Convert timestamp to date and normalize to midnight
            const date = new Date(parseInt(timestamp) * 1000);
            date.setHours(0, 0, 0, 0);
            const normalizedTimestamp = Math.floor(date.getTime() / 1000).toString();
            
            // If multiple submissions on same day, sum them up
            normalizedSubmissionData[normalizedTimestamp] = (normalizedSubmissionData[normalizedTimestamp] || 0) + count;
        });
        
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            // Normalize to start of day (midnight)
            date.setHours(0, 0, 0, 0);
            
            // Convert normalized date to Unix timestamp (in seconds)
            const timestamp = Math.floor(date.getTime() / 1000).toString();
            
            // Get submission count for this timestamp
            const submissionCount = normalizedSubmissionData[timestamp] || 0;
            
            data.push({
                date: date.toISOString().split('T')[0],
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
                <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-max" style={{ gridTemplateColumns: 'repeat(53, minmax(0, 1fr))' }}>
                    {activityData.map((day, index) => {
                        const date = new Date(day.date);
                        const formattedDate = date.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        });
                        const tooltipText = day.count === 0 
                            ? `No submissions on ${formattedDate}`
                            : `${day.count} submission${day.count > 1 ? 's' : ''} on ${formattedDate}`;
                        
                        return (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-sm ${getColorClass(day.level)} hover:opacity-80 transition-opacity cursor-pointer`}
                                title={tooltipText}
                            ></div>
                        );
                    })}
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