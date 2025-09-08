import { Loader2, Sparkles } from "lucide-react";
import { InsightData, Topic } from "../utils/insight.types";
// import ProgressBar from "./ProgressBar";

const TopicCard: React.FC<{
    topic: Topic;
    hasInsights: boolean;
    onGenerateInsights: () => void;
    onViewInsights: () => void;
    isGenerating: boolean;
    isDarkMode: boolean;
    isSelected: boolean;
    insightData?: InsightData;
}> = ({ topic, hasInsights, onGenerateInsights, onViewInsights, isGenerating, isDarkMode, isSelected, insightData }) => (
    <div className={`rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer ${isDarkMode
        ? 'bg-slate-800 border-slate-600 hover:border-slate-500'
        : 'bg-white border-gray-200 hover:border-gray-300'
        } ${isSelected ? 'ring-1 ring-orange-600 border-orange-600' : ''}`}
        onClick={hasInsights ? onViewInsights : undefined}>
        <div className="p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {topic.name}
                </h3>
                {/* {hasInsights && insightData && (
                    <span className="text-orange-600 font-semibold text-sm">
                        {insightData.progress.current}/{insightData.progress.total}
                    </span>
                )} */}
            </div>

            {hasInsights && insightData ? (
                <>
                    {/* <ProgressBar
                        current={insightData.progress.current}
                        total={insightData.progress.total}
                        isDarkMode={isDarkMode}
                    /> */}
                    <div className="flex justify-between mt-3 text-xs">
                        <span className="text-green-600 font-medium">
                            Strength: {insightData.strength}
                        </span>
                        <span className="text-red-600 font-medium">
                            Focus on: {insightData.focusOn}
                        </span>
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-3">
                    <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {topic.questionCount} questions available
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onGenerateInsights();
                        }}
                        disabled={isGenerating}
                        className="w-full bg-blue-950 hover:bg-blue-900 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Generating AI Insights...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4 mr-2" />
                                Generate AI Insights
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    </div>
);

export default TopicCard;