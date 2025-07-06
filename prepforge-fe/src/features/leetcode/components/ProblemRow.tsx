
export const ProblemRow = ({ problem, onToggle, isDarkMode }: any) => {

    const handlePracticeProblem = (titleSlug: string) => {
        window.open(`https://leetcode.com/problems/${titleSlug}`);
    }

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
                    <button className="bg-green-100 text-green-700 font-extrabold hover:bg-green-200" onClick={() => handlePracticeProblem(problem?.titleSlug)}>
                        Practice
                    </button>
                </td>
            </tr>
        </>
    )
};