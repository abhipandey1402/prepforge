// Updated LeetcodeProblems Component
import { useEffect, useState } from "react";
import { LayoutContainer } from "../components/LayoutContainer";
import { SearchInput } from "../components/SearchInput";
import { useLeetCodeProblems } from "../hooks/useLeetCodeProblems";
import ProblemsTable from "../components/ProblemsTable";

export default function LeetcodeProblems({ }: any) {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [expandedProblem, setExpandedProblem] = useState<string | null>(null);
    const [isDarkMode] = useState(true);

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

    const { problems, loading, error, refetch } = useLeetCodeProblems({
        page,
        size,
        setTotal,
        searchQuery: debouncedSearchQuery,
        filters: {},
        sort: {}
    });

    // Handle toggle problem details
    const toggleProblemDetails = (id: string) => {
        setExpandedProblem(expandedProblem === id ? null : id);
    };

    // Handle search input change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Handle items per page change
    const handleItemsPerPageChange = (newSize: number) => {
        setSize(newSize);
        setPage(1); // Reset to first page when changing page size
    };

    return (
        <LayoutContainer isDarkMode={isDarkMode}>
            <div className="container mx-auto px-4 py-4">
                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            Recent Problems
                        </h2>
                        <div className="flex items-center space-x-4">
                            <SearchInput 
                                value={searchQuery} 
                                onChange={handleSearchChange} 
                                isDarkMode={isDarkMode} 
                                placeholder="Search problems..." 
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
                                {loading ? 'Searching...' : 
                                    `Found ${total} result${total !== 1 ? 's' : ''} for "${searchQuery}"`}
                            </p>
                        </div>
                    )}
                    
                    <ProblemsTable
                        problems={problems}
                        expandedProblem={expandedProblem}
                        toggleProblemDetails={toggleProblemDetails}
                        isDarkMode={isDarkMode}
                        currentPage={page}
                        setCurrentPage={handlePageChange}
                        itemsPerPage={size}
                        setItemsPerPage={handleItemsPerPageChange}
                        totalProblems={total}
                        loading={loading}
                        isSearchMode={!!searchQuery}
                    />
                </div>
            </div>
        </LayoutContainer>
    );
}