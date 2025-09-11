import { useState, useEffect } from 'react';
import { topicsData } from '../utils/aiInsightTopics';
import SearchInput from '../components/SearchInput';
import TopicCard from '../components/TopicCard';
import AIInsightPanel from '../components/AIInsightPanel';
import EmptyInsightsPanel from '../components/EmptyInsightsPanel';
import { InsightData, Topic } from '../utils/insight.types';
import axiosClient from '@/interceptors/axiosClient';
import axios from 'axios';


export default function AiInsights({ isDarkMode }: { isDarkMode: boolean }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [generatedInsights, setGeneratedInsights] = useState<Map<string, InsightData>>(new Map());
    const [generatingTopics, setGeneratingTopics] = useState<Set<string>>(new Set());
    const [selectedInsight, setSelectedInsight] = useState<InsightData | null>(null);
    const [loadingInsights, setLoadingInsights] = useState(true);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch all existing insights on component mount
    useEffect(() => {
        const fetchExistingInsights = async () => {
            try {
                setLoadingInsights(true);
                const response = await axiosClient.get('/agents/get-insights');

                console.log(response?.data);
                if (response?.data?.data) {
                    const insightsMap = new Map<string, InsightData>();

                    // Assuming the response contains an array of insights with topic slugs
                    response?.data?.data.forEach((insight: any) => {
                        if (insight.topic && insight.data) {
                            // If the insight data is stringified, parse it
                            const parsedData = typeof insight.data === 'string'
                                ? JSON.parse(insight.data)
                                : insight.data;
                            insightsMap.set(insight.topic, parsedData);
                        }
                    });

                    setGeneratedInsights(insightsMap);
                }
            } catch (err: any) {
                if (!axios.isCancel(err)) {
                    console.error("Fetch existing insights error:", err);
                }
            } finally {
                setLoadingInsights(false);
            }
        };

        fetchExistingInsights();
    }, []);

    // Function to refresh all insights data
    const refreshInsightsData = async () => {
        try {
            const response = await axiosClient.get('/agents/get-insights');

            console.log(response?.data?.data);
            if (response?.data?.data) {
                const insightsMap = new Map<string, InsightData>();

                response.data.data.forEach((insight: any) => {
                    if (insight.topic && insight.data) {
                        const parsedData = typeof insight.data === 'string'
                            ? JSON.parse(insight.data)
                            : insight.data;
                        insightsMap.set(insight.topic, parsedData);
                    }
                });

                setGeneratedInsights(insightsMap);
            }
        } catch (err: any) {
            if (!axios.isCancel(err)) {
                console.error("Refresh insights error:", err);
            }
        }
    };

    const filteredTopics = topicsData
        .filter(topic =>
            topic.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );

    const handleGenerateInsights = async (topic: Topic) => {
        setGeneratingTopics(prev => new Set([...prev, topic.slug]));

        try {
            const response = await axiosClient.post(`/agents/get-insights-by-topic`, {
                topic: topic.slug,
                limit: 5,
            });

            if (response?.data?.data) {
                const insights = JSON.parse(response.data.data);

                // Update local state with new insight
                setGeneratedInsights(prev => new Map([...prev, [topic.slug, insights]]));

                // Auto-select the generated insight
                setSelectedInsight(insights);

                // Refresh all insights data to ensure we have the latest from DB
                await refreshInsightsData();
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (err: any) {
            if (!axios.isCancel(err)) {
                console.error("Fetch insights error:", err);
            }
        } finally {
            setGeneratingTopics(prev => {
                const newSet = new Set(prev);
                newSet.delete(topic.slug);
                return newSet;
            });
        }
    };

    const handleViewInsights = (topicSlug: string) => {
        const insights = generatedInsights.get(topicSlug);
        if (insights) {
            setSelectedInsight(insights);
        }
    };

    const totalGenerated = generatedInsights.size;
    const totalTopics = topicsData.length;

    // Show loading state while fetching initial insights
    if (loadingInsights) {
        return (
            <div className={`min-h-screen rounded-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-center h-64">
                        <div className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Loading insights...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen rounded-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-gray-100'}`}>
            <div className="container mx-auto px-4 py-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {totalGenerated}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                            Generated Insights
                        </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {generatingTopics.size}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                            In Progress
                        </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {Math.round((totalGenerated / totalTopics) * 100)}%
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                            Complete
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-120px)]">

                    {/* Topics Panel */}
                    <div className={`rounded-xl col-start-1 col-end-3 overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                        {/* Search Controls */}
                        <div className="p-4 border-b border-slate-600">
                            <div className="flex gap-2 mb-0">
                                <SearchInput
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    isDarkMode={isDarkMode}
                                    placeholder="Search topics..."
                                />
                            </div>

                            {searchQuery && (
                                <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                                    Found {filteredTopics.length} topics
                                </div>
                            )}
                        </div>

                        {/* Topics List */}
                        <div className="p-4 pb-20 h-full overflow-y-auto">
                            <div className="grid gap-4">
                                {filteredTopics.map((topic) => (
                                    <TopicCard
                                        key={topic.slug}
                                        topic={topic}
                                        hasInsights={generatedInsights.has(topic.slug)}
                                        onGenerateInsights={() => handleGenerateInsights(topic)}
                                        onViewInsights={() => handleViewInsights(topic.slug)}
                                        isGenerating={generatingTopics.has(topic.slug)}
                                        isDarkMode={isDarkMode}
                                        isSelected={selectedInsight?.topic === topic.name}
                                        insightData={generatedInsights.get(topic.slug)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Insights Panel */}
                    <div className="h-full col-start-3 col-end-6">
                        {selectedInsight ? (
                            <AIInsightPanel
                                insight={selectedInsight}
                                isDarkMode={isDarkMode}
                                onClose={() => setSelectedInsight(null)}
                            />
                        ) : (
                            <EmptyInsightsPanel isDarkMode={isDarkMode} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}