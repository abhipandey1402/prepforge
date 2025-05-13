import { Search } from 'lucide-react';

export const SearchInput = ({ value, onChange, isDarkMode }: any) => (
    <div className="relative">
        <Search className={`absolute left-3 top-2.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
        <input
            type="text"
            placeholder="Search submissions..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-lg w-64 ${isDarkMode
                ? 'bg-slate-800 text-white placeholder-gray-400 border-gray-600'
                : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300'}
        border focus:outline-none focus:ring-2 focus:ring-orange-500`}
        />
    </div>
);