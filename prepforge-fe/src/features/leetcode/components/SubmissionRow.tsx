import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "./Badge";

const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    // Format date as DD/MM/YYYY
    const dateString = date.toLocaleDateString('en-GB'); // 'en-GB' uses day/month/year format

    // Format time with hours, minutes, seconds and AM/PM
    const timeString = date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
    });

    return `${dateString}, ${timeString}`;
};


export const getSubmissionStatusDisplay = (status: number) => {
    switch (status) {
        case 10:
            return { label: "Accepted", color: "green" };
        case 11:
            return { label: "Wrong Answer", color: "red" };
        case 12:
            return { label: "Memory Limit Exceeded", color: "orange" };
        case 13:
            return { label: "Output Limit Exceeded", color: "orange" };
        case 14:
            return { label: "Time Limit Exceeded", color: "orange" };
        case 15:
            return { label: "Runtime Error", color: "red" };
        case 16:
            return { label: "Internal Error", color: "gray" };
        case 20:
            return { label: "Compile Error", color: "blue" };
        case 30:
            return { label: "Unknown Error", color: "gray" };
        default:
            return { label: "Unknown", color: "gray" };
    }
};


export const SubmissionRow = ({ submission, isExpanded, onToggle, isDarkMode }: any) => {
    const { label } = getSubmissionStatusDisplay(submission?.status);


    return (
        <>
            <tr
                className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b transition-colors hover:${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'} text-sm cursor-pointer`}
                onClick={() => onToggle(submission._id)}
            >
                <td className="px-4 py-3">
                    <div className="flex flex-col">
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{submission?.questionId + ". " + submission.title}</span>
                        <Badge text={submission.difficulty} type="difficulty" isDarkMode={isDarkMode} />
                    </div>
                </td>
                <td className="px-4 py-3">
                    <Badge text={label} type="status" isDarkMode={isDarkMode} />
                </td>
                <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{submission.lang}</td>
                <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{submission.runtime}</td>
                <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{submission.memory}</td>
                <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{formatTimestamp(submission?.timestamp)}</td>
                <td className="px-4 py-3">
                    <button className={`p-1 rounded-full bg-blue-950 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                </td>
            </tr>
        </>
    )
};