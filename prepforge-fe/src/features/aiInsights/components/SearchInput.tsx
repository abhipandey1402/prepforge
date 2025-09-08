import { Search } from "lucide-react";

const SearchInput: React.FC<{
    value: string;
    onChange: (value: string) => void;
    isDarkMode: boolean;
    placeholder: string;
}> = ({ value, onChange, isDarkMode, placeholder }) => (
    <div className="relative flex-1">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'
            }`} />
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors text-sm ${isDarkMode
                ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
                } focus:ring-2`}
        />
    </div>
);

export default SearchInput;