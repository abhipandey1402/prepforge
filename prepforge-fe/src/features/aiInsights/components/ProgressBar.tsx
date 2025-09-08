const ProgressBar: React.FC<{ current: number; total: number; isDarkMode: boolean }> = ({ current, total, isDarkMode }) => {
    const percentage = (current / total) * 100;

    return (
        <div className="w-full">
            <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                }`}>
                <div
                    className="h-full bg-orange-600 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;