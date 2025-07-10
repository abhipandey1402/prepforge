import { useEffect, useState } from "react";
import { LayoutContainer } from "../components/LayoutContainer";
import { SearchInput } from "../components/SearchInput";
import { SubmissionsTable } from "../components/SubmissionsTable";
import { AnalyticsSection } from "../components/AnalyticsSection";
import { ProgressSection } from "../components/ProgressSection";
import { ActivityHeatmap } from "../components/ActivityHeatMap";
import { useLeetCodeSubmissions } from "../hooks/useLeetcodeSubmissions";
import { useLeetCodeUserStats } from "../hooks/useLeetcodeUserStats";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useLeetCodeSync } from "@/features/leetcode/hooks/useLeetCodeSync";
import SyncingUI from "../components/SyncingUI";
import ExtensionAuthScreen from "../components/ExtensionAuthScreen";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useLeetCodeAuthSocket } from "../hooks/useLeetCodeAuthSocket";
import { useLeetCodeHeatmap } from "../hooks/useLeetCodeHeatmap";

interface UserStats {
    totalSolved: any;
    easySolved: any;
    mediumSolved: any;
    hardSolved: any;
    acceptanceRate: any;
    streak: any;
    ranking: any;
}

export default function LeetcodeSubmissions({ isDarkMode }: any) {
    const accessToken = useSelector((state: RootState) => state.auth?.userData?.accessToken);
    const { isAuthenticated, sessionToken, logout } = useLeetCodeAuthSocket();

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

    const { progress, status } = useLeetCodeSync();

    // Debounce search query to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
            // Reset to page 1 when search query changes
            if (searchQuery !== debouncedSearchQuery) {
                setPage(1);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, debouncedSearchQuery]);

    const {
        submissions,
        loading: submissionsLoading,
        refetch: refetchSubmissions,
    } = useLeetCodeSubmissions({
        page,
        size,
        searchQuery: debouncedSearchQuery,
        setTotal
    });

    const { heatmapData, refetch: refetchHeatmap } = useLeetCodeHeatmap();

    const { stats, refetch: refetchUserStats } = useLeetCodeUserStats();

    useEffect(() => {
        if (status === 'success') {
            // Small delay to ensure backend is ready
            const timeoutId = setTimeout(() => {
                console.log('Sync completed, fetching fresh data...');
                refetchSubmissions();
                refetchUserStats();
                refetchHeatmap();
            }, 1500);

            return () => clearTimeout(timeoutId);
        }
    }, [status, refetchSubmissions, refetchHeatmap]);

    const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);
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

    // Handle toggle submission details
    const toggleSubmissionDetails = (id: string) => {
        setExpandedSubmission(expandedSubmission === id ? null : id);
    };

    // Handle search input change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
    };

    // Handle page change - reset search when changing pages in normal mode
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Handle items per page change
    const handleItemsPerPageChange = (newSize: number) => {
        setSize(newSize);
        setPage(1); // Reset to first page when changing page size
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
                    <ExtensionAuthScreen
                        jwt={accessToken}
                        token={sessionToken && sessionToken}
                        isAuthenticated={isAuthenticated}
                        isDarkMode={isDarkMode}
                    />
                ) : (isAuthenticated && status === 'fetching') ? (
                    <SyncingUI progress={progress} status={status} isDarkMode={isDarkMode} />
                ) : (
                    <div className="container mx-auto px-4 py-4">
                        {/* Header with User Info and Logout */}
                        <div className={`mb-6 p-4 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                        Track your progress and analyze your coding journey
                                    </h3>
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
                                <ActivityHeatmap submissionCalendar={heatmapData?.submissionCalendar} isDarkMode={isDarkMode} />
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
                                        <div className="flex items-center space-x-4">
                                            <SearchInput
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                isDarkMode={isDarkMode}
                                                placeholder="Search submissions..."
                                            />
                                            {searchQuery && (
                                                <button
                                                    onClick={() => setSearchQuery('')}
                                                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                                        isDarkMode 
                                                            ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                                >
                                                    Clear
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Search Results Info */}
                                    {searchQuery && (
                                        <div className={`mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {submissionsLoading ? 'Searching...' : 
                                                    `Found ${total} result${total !== 1 ? 's' : ''} for "${searchQuery}"`}
                                            </p>
                                        </div>
                                    )}
                                    
                                    <SubmissionsTable
                                        submissions={submissions}
                                        expandedSubmission={expandedSubmission}
                                        toggleSubmissionDetails={toggleSubmissionDetails}
                                        isDarkMode={isDarkMode}
                                        currentPage={page}
                                        setCurrentPage={handlePageChange}
                                        itemsPerPage={size}
                                        setItemsPerPage={handleItemsPerPageChange}
                                        totalSubmissions={total}
                                        loading={submissionsLoading}
                                        isSearchMode={!!searchQuery}
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