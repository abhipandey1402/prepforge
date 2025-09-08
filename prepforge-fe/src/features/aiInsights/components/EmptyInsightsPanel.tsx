import { Brain } from "lucide-react";

const EmptyInsightsPanel: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
    <div className={`h-full rounded-xl border flex items-center justify-center ${isDarkMode
        ? 'bg-slate-800 border-slate-600'
        : 'bg-white border-gray-200'
        }`}>
        <div className="text-center p-8">
            <Brain className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                No AI Insights Selected
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Generate or select insights for a topic to view detailed analysis
            </p>
        </div>
    </div>
);

export default EmptyInsightsPanel;