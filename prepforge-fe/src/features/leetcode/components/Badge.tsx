
export const Badge = ({ text, type, isDarkMode }: { text: string; type: 'status' | 'difficulty'; isDarkMode: boolean }) => {
    const getClass = () => {
        if (type === 'difficulty') {
            return text === 'Easy' ? 'text-green-500' : text === 'Medium' ? 'text-yellow-500' : 'text-red-500';
        } else {
            if (text === 'Accepted') return isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
            if (text === 'Wrong Answer') return isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
            return isDarkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
        }
    };
    return (
        <span className={`${type === 'status' ? 'px-2 py-1 rounded-md text-sm' : 'text-sm'} ${getClass()} whitespace-nowrap inline-block`}>{text}</span>
    );
};