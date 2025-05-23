import { ChevronDown, ChevronRight } from "lucide-react";

export const ProblemRow = ({ problem, isExpanded, onToggle, isDarkMode }: any) => {

    return (
        <>
            <tr
                className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b transition-colors hover:${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'} text-sm cursor-pointer`}
                onClick={() => onToggle(problem._id)}
            >
                <td className="px-4 py-3">
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{problem?.questionFrontendId + ". " + problem.title}</span>
                </td>
                <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{problem.status}</td>
                <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{problem.difficulty}</td>
                <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {problem.topicTags?.map((tag: { name: string }) => tag?.name)?.join(', ')}
                </td>
                <td className="px-4 py-3">
                    <button className={`p-1 rounded-full ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                </td>
            </tr>
        </>
    )
};