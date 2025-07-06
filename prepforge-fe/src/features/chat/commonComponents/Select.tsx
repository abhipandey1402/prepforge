import React, { useState } from "react";

const Select: React.FC<{
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: { value: string; label: string }) => void;
    placeholder: string;
    className?: string; // Allow optional className prop
}> = ({ options, value, placeholder, onChange, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState("");

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(filter.toLowerCase())
    );

    const handleOptionClick = (option: { value: string; label: string }) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={`relative w-full ${className || ""}`}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-800 text-white py-2 px-4 text-left"
            >
                {value ? options.find((opt) => opt.value === value)?.label : placeholder}
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full max-h-60 overflow-auto rounded-lg border border-gray-300 bg-gray-800 shadow-lg">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full p-2 border-b border-gray-700 bg-gray-900 text-white"
                    />
                    <ul className="py-1">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-700 text-white"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                    {filteredOptions.length === 0 && (
                        <p className="px-4 py-2 text-gray-400">No options found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Select;
