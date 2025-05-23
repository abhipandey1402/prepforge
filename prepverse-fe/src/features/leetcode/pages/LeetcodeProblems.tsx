import { useState } from "react";
import { LayoutContainer } from "../components/LayoutContainer";
import { SearchInput } from "../components/SearchInput";
import { useLeetCodeProblems } from "../hooks/useLeetCodeProblems";
import ProblemsTable from "../components/ProblemsTable";


export default function LeetcodeProblems({ }: any) {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState<number>(0);

    const { problems } = useLeetCodeProblems(page, size, setTotal);

    const [searchQuery, setSearchQuery] = useState('');
    const [expandedProblem, setExpandedProblem] = useState<string | null>(null);
    const [isDarkMode] = useState(true);

    // Filter problems based on search query
    const filteredProblems = problems && problems?.filter(problem =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.titleSlug.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Handle toggle problem details
    const toggleProblemDetails = (id: string) => {
        setExpandedProblem(expandedProblem === id ? null : id);
    };

    return (
        <LayoutContainer isDarkMode={isDarkMode}>
            <div className="container mx-auto px-4 py-4">
                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Problems</h2>
                        <SearchInput value={searchQuery} onChange={setSearchQuery} isDarkMode={isDarkMode} placeholder="Search problems..." />
                    </div>
                    <ProblemsTable
                        problems={filteredProblems}
                        expandedProblem={expandedProblem}
                        toggleProblemDetails={toggleProblemDetails}
                        isDarkMode={isDarkMode}
                        currentPage={page}
                        setCurrentPage={setPage}
                        itemsPerPage={size}
                        setItemsPerPage={setSize}
                        totalProblems={total}
                    />
                </div>
            </div>
        </LayoutContainer>
    );
}