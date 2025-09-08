import { Brain, CheckCircle, TrendingUp, X } from "lucide-react";
import { InsightData } from "../utils/insight.types";
// import ProgressBar from "./ProgressBar";

const AIInsightPanel: React.FC<{
    insight: InsightData;
    isDarkMode: boolean;
    onClose: () => void;
}> = ({ insight, isDarkMode, onClose }) => (
    <div className={`rounded-xl border h-full overflow-hidden ${isDarkMode
        ? 'bg-slate-800 border-slate-600'
        : 'bg-white border-gray-200'
        }`}>
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-slate-600' : 'border-gray-200'
            }`}>
            <div className="flex items-center">
                <Brain className="h-5 w-5 text-orange-600 mr-2" />
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    AI Analysis: {insight.topic}
                </span>
            </div>
            <button
                onClick={onClose}
                className={`p-1 rounded hover:bg-opacity-20 ${isDarkMode ? 'hover:bg-white text-slate-400' : 'hover:bg-black text-gray-600'
                    }`}
            >
                <X className="h-4 w-4" />
            </button>
        </div>

        <div className="p-4 h-full overflow-y-auto">
            {/* Progress Section */}
            {/* <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                        Progress
                    </span>
                    <span className="text-orange-600 font-bold text-lg">
                        {insight.progress.current}/{insight.progress.total}
                    </span>
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    problems
                </span>
                <ProgressBar
                    current={insight.progress.current}
                    total={insight.progress.total}
                    isDarkMode={isDarkMode}
                />
            </div> */}

            {/* Complexity Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                    <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>
                        Avg. Time Complexity
                    </div>
                    <div className="text-orange-600 font-bold text-lg">
                        {insight.avgTimeComplexity}
                    </div>
                </div>
                <div className="text-center">
                    <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>
                        Avg. Space Complexity
                    </div>
                    <div className="text-orange-600 font-bold text-lg">
                        {insight.avgSpaceComplexity}
                    </div>
                </div>
            </div>

            {/* Strengths and Areas to Improve */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <div className="flex items-center mb-3">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <h4 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Strengths
                        </h4>
                    </div>
                    <ul className="space-y-2">
                        {insight.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-3 flex-shrink-0" />
                                <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                                    {strength}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="flex items-center mb-3">
                        <TrendingUp className="h-4 w-4 text-orange-500 mr-2" />
                        <h4 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Areas to Improve
                        </h4>
                    </div>
                    <ul className="space-y-2">
                        {insight.areasToImprove.map((area, i) => (
                            <li key={i} className="flex items-start">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 mr-3 flex-shrink-0" />
                                <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                                    {area}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Recommended Problems */}
            <div>
                <h4 className={`font-semibold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Recommended Problems
                </h4>
                <div className="space-y-3">
                    {insight.recommendedProblems.map((problem, i) => (
                        <div key={i} className={`p-3 rounded-lg border ${isDarkMode
                            ? 'bg-slate-700 border-slate-600'
                            : 'bg-gray-50 border-gray-200'
                            }`}>
                            <div className="flex items-center justify-between mb-1">
                                <h5 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {problem.title}
                                </h5>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${problem.difficulty === 'Easy'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : problem.difficulty === 'Medium'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                    }`}>
                                    {problem.difficulty}
                                </span>
                            </div>
                            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                                {problem.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default AIInsightPanel;