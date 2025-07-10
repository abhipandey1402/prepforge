import { Sun, Moon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleCurrentTheme } from '../slices/configSlice';

export default function ThemeToggle() {
    const isDarkMode = useSelector((state: RootState) => state.config?.isDarkTheme);
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleCurrentTheme());
    };

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                className={`relative w-14 h-7 rounded-full transition-all duration-500 transform hover:scale-105 active:scale-95 focus:outline-none ${isDarkMode
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-700 focus:ring-purple-500/30'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 focus:ring-orange-500/30'
                    }`}
                style={{
                    boxShadow: isDarkMode
                        ? '0 4px 20px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        : '0 4px 20px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
            >
                {/* Sliding circle */}
                <div className={`absolute top-0.5 left-0 w-6 h-6 rounded-full transition-all duration-500 transform ${isDarkMode ? 'translate-x-8' : 'translate-x-0.5'
                    } ${isDarkMode
                        ? 'bg-gradient-to-br from-slate-800 to-slate-900'
                        : 'bg-gradient-to-br from-white to-gray-100'
                    }`}
                    style={{
                        boxShadow: isDarkMode
                            ? '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            : '0 2px 10px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                    }}
                >
                    {/* Icon container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`transition-all duration-300 ${isDarkMode ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180'
                            }`}>
                            <Moon className="w-4 h-4 text-purple-300" />
                        </div>
                        <div className={`absolute transition-all duration-300 ${isDarkMode ? 'opacity-0 scale-50 -rotate-180' : 'opacity-100 scale-100 rotate-0'
                            }`}>
                            <Sun className="w-4 h-4 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
}