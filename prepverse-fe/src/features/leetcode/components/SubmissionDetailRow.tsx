import CodeViewer from "./CodeViewer";

export const SubmissionDetailRow = ({ submission, isDarkMode }: any) => (
    <tr className={`${isDarkMode ? 'bg-gray-850' : 'bg-gray-50'}`}>
        <td colSpan={7} className="px-4 py-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'} overflow-x-auto`}>
                <div className={`flex justify-between items-center mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    <span className="font-medium">Solution Code</span>
                    <span className={`text-sm px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>{submission.lang}</span>
                </div>
                <CodeViewer code={submission?.code} language={submission?.lang} theme={isDarkMode ? 'dark' : 'light'} height="500px" />
            </div>
        </td>
    </tr>
);