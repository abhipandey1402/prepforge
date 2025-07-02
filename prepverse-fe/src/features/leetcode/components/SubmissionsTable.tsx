import React from "react";
import { SubmissionRow } from "./SubmissionRow";
import { SubmissionDetailRow } from "./SubmissionDetailRow";

export const SubmissionsTable = ({ submissions, expandedSubmission, toggleSubmissionDetails, isDarkMode, currentPage, setCurrentPage, itemsPerPage, setItemsPerPage, totalSubmissions }: any) => {

    // Page navigation handlers
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalSubmissions) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => {
        if (currentPage < totalSubmissions) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Items per page handler
    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr className={`${isDarkMode ? 'text-gray-400 border-gray-700' : 'text-gray-600 border-gray-300'} border-b`}>
                        <th className="px-4 py-3 text-left">Problem</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Language</th>
                        <th className="px-4 py-3 text-left">Runtime</th>
                        <th className="px-4 py-3 text-left">Memory</th>
                        <th className="px-4 py-3 text-left">Submitted At</th>
                        <th className="px-4 py-3 text-left">Submission Code</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions?.length > 0 ? (
                        submissions?.map((s: any) => (
                            <React.Fragment key={s?._id}>
                                <SubmissionRow
                                    submission={s}
                                    isExpanded={expandedSubmission === s?._id}
                                    onToggle={toggleSubmissionDetails}
                                    isDarkMode={isDarkMode}
                                />
                                {expandedSubmission === s?._id && <SubmissionDetailRow submission={s} isDarkMode={isDarkMode} />}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className={`px-4 py-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                No submissions found matching your search. {submissions?.length}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {submissions?.length > 0 && (
                <div className={`flex items-center justify-between mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center">
                        <span className="mr-2">Show</span>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className={`mx-1 p-1 rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="ml-2">per page</span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <span className="mr-4">
                            {submissions?.length > 0 ?
                                `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage)} of ${totalSubmissions}` :
                                '0 results'}
                        </span>

                        <button
                            onClick={() => goToPage(1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded ${currentPage === 1
                                ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`
                                }`}
                        >
                            &lt;&lt;
                        </button>

                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`p-2 rounded ${currentPage === 1
                                ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`
                                }`}
                        >
                            &lt;
                        </button>

                        {/* Page number buttons */}
                        <div className="flex space-x-1">
                            {Array.from({ length: Math.min(5, totalSubmissions/itemsPerPage) }, (_, i) => {
                                let pageNum;
                                if (totalSubmissions <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalSubmissions - 2) {
                                    pageNum = totalSubmissions - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => goToPage(pageNum)}
                                        className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === pageNum
                                            ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                                            : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalSubmissions}
                            className={`p-2 rounded ${currentPage === totalSubmissions
                                ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`
                                }`}
                        >
                            &gt;
                        </button>

                        <button
                            onClick={() => goToPage(Math.floor(totalSubmissions/itemsPerPage))}
                            disabled={currentPage === Math.floor(totalSubmissions/itemsPerPage)}
                            className={`p-2 rounded ${currentPage === Math.floor(totalSubmissions/itemsPerPage)
                                ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`
                                }`}
                        >
                            &gt;&gt;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmissionsTable;