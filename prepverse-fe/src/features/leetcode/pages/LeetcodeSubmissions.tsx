import { useState } from "react";
import AuthorizationScreen from "../components/AuthorizationScreen";
import { LayoutContainer } from "../components/LayoutContainer";
import { SearchInput } from "../components/SearchInput";
import { StatsSection } from "../components/StatsSection";
import { SubmissionsTable } from "../components/SubmissionsTable";
import { useLeetCodeSubmissions } from "../hooks/useLeetcodeSubmissions";
import { useLeetCodeUserStats } from "../hooks/useLeetcodeUserStats";


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
    const { submissions } = useLeetCodeSubmissions();
    const { stats } = useLeetCodeUserStats();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);
    const [isDarkMode] = useState(true);

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
                    <StatsSection stats={leetcodeUserStats} isDarkMode={isDarkMode} />

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