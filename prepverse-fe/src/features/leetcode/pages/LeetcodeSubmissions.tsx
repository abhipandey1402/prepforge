import { useEffect, useState } from "react";
import AuthorizationScreen from "../components/AuthorizationScreen";
import { LayoutContainer } from "../components/LayoutContainer";
import { SearchInput } from "../components/SearchInput";
import { SubmissionsTable } from "../components/SubmissionsTable";
import { AnalyticsSection } from "../components/AnalyticsSection";
import { ProgressSection } from "../components/ProgressSection";
import { ActivityHeatmap } from "../components/ActivityHeatMap";
import { useLeetCodeSubmissions } from "../hooks/useLeetcodeSubmissions";
import { useLeetCodeUserStats } from "../hooks/useLeetcodeUserStats";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useLeetCodeAuth } from "../../globalFeatures/hooks/useLeetCodeAuth";
import { useLeetCodeSync } from "@/features/leetcode/hooks/useLeetCodeSync";
import SyncingUI from "../components/SyncingUI";

interface UserStats {
    totalSolved: any;
    easySolved: any;
    mediumSolved: any;
    hardSolved: any;
    acceptanceRate: any;
    streak: any;
    ranking: any;
}

export default function LeetcodeSubmissions({ }: any) {
    const {
        isAuthenticated,
        isAuthorizing,
        error: authError,
        authorize,
        logout,
    } = useLeetCodeAuth();

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState<number>(0);

    const { progress, status } = useLeetCodeSync();

    const {
        submissions,
        refetch: refetchSubmissions,
    } = useLeetCodeSubmissions({
        page,
        size,
        setTotal
    });

    const { stats, refetch: refetchUserStats } = useLeetCodeUserStats();

    useEffect(() => {
        if (status === 'success') {
            // Small delay to ensure backend is ready
            const timeoutId = setTimeout(() => {
                console.log('Sync completed, fetching fresh data...');
                refetchSubmissions();
                refetchUserStats();
            }, 1500);

            return () => clearTimeout(timeoutId);
        }
    }, [status, refetchSubmissions]);


    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);
    const [isDarkMode] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'submissions'>('overview');

    const leetcodeUserStats: UserStats = {
        totalSolved: stats?.totalSolved,
        easySolved: stats?.easySolved,
        mediumSolved: stats?.mediumSolved,
        hardSolved: stats?.hardSolved,
        acceptanceRate: stats?.acceptanceRate,
        streak: stats?.streak,
        ranking: stats?.ranking
    };

    // Filter submissions based on search query
    const filteredSubmissions = submissions && submissions?.filter(submission =>
        submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.lang.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle toggle submission details
    const toggleSubmissionDetails = (id: string) => {
        setExpandedSubmission(expandedSubmission === id ? null : id);
    };

    // Navigation tabs
    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'submissions', label: 'Submissions', icon: '📝' },
        { id: 'analytics', label: 'Analytics', icon: '📈' }
    ];

    return (
        <ErrorBoundary>
            <LayoutContainer isDarkMode={isDarkMode}>
                {!isAuthenticated ? (
                    <AuthorizationScreen
                        onAuthorize={authorize}
                        isDarkMode={isDarkMode}
                        isLoading={isAuthorizing}
                        error={authError}
                    />
                ) : (isAuthenticated && status === 'fetching') ? (
                    <SyncingUI progress={progress} status={status} isDarkMode={isDarkMode} />
                ) : (
                    <div className="container mx-auto px-4 py-4">
                        {/* Header with User Info and Logout */}
                        <div className={`mb-6 p-4 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                        LeetCode Analytics Dashboard
                                    </h1>
                                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Track your progress and analyze your coding journey
                                    </p>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                >
                                    Revoke Connection
                                </button>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className={`mb-6 p-1 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
                            <div className="flex space-x-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === tab.id
                                            ? 'bg-orange-600 text-white shadow-md'
                                            : isDarkMode
                                                ? 'text-gray-400 hover:text-white hover:bg-slate-800'
                                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span className="mr-2">{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content based on active tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <ProgressSection stats={leetcodeUserStats} isDarkMode={isDarkMode} />
                                <ActivityHeatmap submissions={submissions} isDarkMode={isDarkMode} />
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="space-y-6">
                                <AnalyticsSection
                                    submissions={submissions}
                                    stats={leetcodeUserStats}
                                    isDarkMode={isDarkMode}
                                />
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Performance Trends */}
                                    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
                                        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                            Performance Trends
                                        </h3>
                                        {/* Add your performance chart component here */}
                                        <div className={`h-64 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'} flex items-center justify-center`}>
                                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Performance Chart Coming Soon
                                            </span>
                                        </div>
                                    </div>

                                    {/* Problem Categories */}
                                    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
                                        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                            Problem Categories
                                        </h3>
                                        {/* Add your category breakdown component here */}
                                        <div className={`h-64 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'} flex items-center justify-center`}>
                                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Category Chart Coming Soon
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'submissions' && (
                            <div className="space-y-6">
                                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                            Recent Submissions
                                        </h2>
                                        <SearchInput
                                            value={searchQuery}
                                            onChange={setSearchQuery}
                                            isDarkMode={isDarkMode}
                                            placeholder="Search submissions..."
                                        />
                                    </div>
                                    <SubmissionsTable
                                        submissions={filteredSubmissions}
                                        expandedSubmission={expandedSubmission}
                                        toggleSubmissionDetails={toggleSubmissionDetails}
                                        isDarkMode={isDarkMode}
                                        currentPage={page}
                                        setCurrentPage={setPage}
                                        itemsPerPage={size}
                                        setItemsPerPage={setSize}
                                        totalSubmissions={total}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </LayoutContainer>
        </ErrorBoundary>
    );
}