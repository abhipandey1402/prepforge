import React from "react";
import { SubmissionRow } from "./SubmissionRow";
import { SubmissionDetailRow } from "./SubmissionDetailRow";

export const SubmissionsTable = ({ submissions, expandedSubmission, toggleSubmissionDetails, isDarkMode }: any) => (
    <div className="">
        <table className="w-full">
            <thead>
                <tr className={`${isDarkMode ? 'text-gray-400 border-gray-700' : 'text-gray-600 border-gray-300'} border-b`}>
                    <th className="px-4 py-3 text-left">Problem</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Language</th>
                    <th className="px-4 py-3 text-left">Runtime</th>
                    <th className="px-4 py-3 text-left">Memory</th>
                    <th className="px-4 py-3 text-left">Submitted</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {submissions.length > 0 ? (
                    submissions.map((s: any) => (
                        <React.Fragment key={s._id}>
                            <SubmissionRow
                                submission={s}
                                isExpanded={expandedSubmission === s._id}
                                onToggle={toggleSubmissionDetails}
                                isDarkMode={isDarkMode}
                            />
                            {expandedSubmission === s._id && <SubmissionDetailRow submission={s} isDarkMode={isDarkMode} />}
                        </React.Fragment>
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} className={`px-4 py-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            No submissions found matching your search.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);