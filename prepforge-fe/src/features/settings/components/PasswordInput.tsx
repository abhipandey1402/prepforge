import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    showPassword: boolean;
    onToggleVisibility: () => void;
    isDarkMode: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    placeholder,
    value,
    onChange,
    showPassword,
    onToggleVisibility,
    isDarkMode,
}) => (
    <div className="relative">
        <input
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} p-3 rounded border border-gray-600 focus:border-orange-500 focus:outline-none pr-10`}
        />
        <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
        >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
    </div>
);

export default PasswordInput;