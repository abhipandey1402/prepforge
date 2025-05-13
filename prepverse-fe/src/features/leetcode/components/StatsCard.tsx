
interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    detail: string;
    isDarkMode: boolean;
}

// Stats Card Component
const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, detail, isDarkMode }) => {
    return (
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg transition-transform transform hover:scale-105 duration-300`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
                    <div className="flex items-end gap-2">
                        <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{value}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{detail}</p>
                    </div>
                </div>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-800 text-orange-500' : 'bg-orange-100 text-orange-600'}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default StatsCard;