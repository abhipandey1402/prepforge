import { Brain, CheckCircle, FileText, TrendingUp } from "lucide-react";
import TopicCard from "../commonComponents/TopicCard";
import InsightStatBox from "../commonComponents/InsightStatBox";
import InsightList from "../commonComponents/InsightList";
import RecommendedProblemCard from "../commonComponents/RecommendedProblemCard";
import { AIInsights, TopicReport } from "../homepage.types";

interface Props {
    topicReports: TopicReport[];
    aiInsights: AIInsights;
    // onTopicSelect: (topic: string) => void;
}

const AIReports: React.FC<Props> = ({ topicReports, aiInsights }) => {
    return (
        <div className="bg-white py-16" id="ai-reports">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-neutral-950 mb-3 flex items-center justify-center gap-3">
                    AI Topic Analysis
                    <span className="bg-yellow-400 text-neutral-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ring-1 ring-yellow-500">
                        Upcoming
                    </span>
                </h2>

                <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                    Get personalized AI reports based on your completed problems in each topic.
                </p>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Topic Cards */}
                    <div className="lg:w-1/3 space-y-4">
                        {topicReports.map((report, index) => (
                            <TopicCard
                                key={index}
                                report={report}
                                isActive={report.topic === aiInsights.topic}
                                // onClick={() => onTopicSelect(report.topic)}
                                onClick={() => console.log("Select topic")}
                            />
                        ))}
                    </div>

                    {/* Detailed Insights */}
                    <div className="lg:w-2/3 bg-slate-100 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-100 p-4 border-b border-gray-200">
                            <div className="flex items-center">
                                <Brain className="h-5 w-5 text-blue-600 mr-2" />
                                <span className="font-medium text-gray-800">AI Analysis: {aiInsights.topic}</span>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Stats */}
                            <div className="flex flex-wrap gap-6 mb-6">
                                <InsightStatBox title="Progress" value={`${aiInsights.completedProblems}/${aiInsights.totalProblems}`} label="problems" />
                                <InsightStatBox title="Avg. Time Complexity" value={aiInsights.timeComplexityAvg} />
                                <InsightStatBox title="Avg. Space Complexity" value={aiInsights.spaceComplexityAvg} />
                            </div>

                            {/* Lists */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <InsightList title="Strengths" items={aiInsights.strengths} icon={<CheckCircle className="h-4 w-4 mr-1 text-green-500" />} colorClass="bg-green-500" />
                                <InsightList title="Areas to Improve" items={aiInsights.weaknesses} icon={<TrendingUp className="h-4 w-4 mr-1 text-orange-500" />} colorClass="bg-orange-500" />
                            </div>

                            {/* Recommended Problems */}
                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">Recommended Problems</h4>
                                <div className="space-y-2">
                                    {aiInsights.recommendedProblems.map((problem: any, i: any) => (
                                        <RecommendedProblemCard key={i} problem={problem} />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors">
                                    Generate Full Report <FileText className="inline ml-1 h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIReports;
