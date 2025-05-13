import { useEffect, useState } from "react";
import AuthorizationScreen from "../components/AuthorizationScreen";
import { LayoutContainer } from "../components/LayoutContainer";
import { SearchInput } from "../components/SearchInput";
import { StatsSection } from "../components/StatsSection";
import { SubmissionsTable } from "../components/SubmissionsTable";
import { useLeetCodeSubmissions } from "../hooks/useLeetcodeSubmissions";


interface UserStats {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    acceptanceRate: number;
    streak: number;
    ranking: number;
}

// Mock data for development
const mockUserStats: UserStats = {
    totalSolved: 387,
    easySolved: 149,
    mediumSolved: 183,
    hardSolved: 55,
    acceptanceRate: 64.3,
    streak: 14,
    ranking: 12564
};


export default function LeetcodeSubmissions({ }: any) {
    const { submissions } = useLeetCodeSubmissions();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);
    const [isDarkMode] = useState(true);

    // Simulate fetching data after authorization
    useEffect(() => {
        if (isAuthorized) {
            setUserStats(mockUserStats);
        }
    }, [isAuthorized]);

    // Filter submissions based on search query
    const filteredSubmissions = submissions.filter(submission =>
        submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.lang.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Handle authorization
    const handleAuthorize = () => {
        setIsAuthorized(true);
    };

    // Handle toggle submission details
    const toggleSubmissionDetails = (id: string) => {
        setExpandedSubmission(expandedSubmission === id ? null : id);
    };

    return (
        <LayoutContainer isDarkMode={isDarkMode}>
            {!isAuthorized ? (
                <AuthorizationScreen onAuthorize={handleAuthorize} isDarkMode={isDarkMode} />
            ) : (
                <div className="container mx-auto px-4 py-4">
                    <StatsSection stats={userStats} isDarkMode={isDarkMode} />

                    <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Submissions</h2>
                            <SearchInput value={searchQuery} onChange={setSearchQuery} isDarkMode={isDarkMode} />
                        </div>
                        <SubmissionsTable
                            submissions={filteredSubmissions}
                            expandedSubmission={expandedSubmission}
                            toggleSubmissionDetails={toggleSubmissionDetails}
                            isDarkMode={isDarkMode}
                        />
                    </div>
                </div>
            )}
        </LayoutContainer>
    );
}