import { ReactNode } from "react";

interface NavItemProps {
    icon: ReactNode;
    label: string;
    handleClick?: any;
    currentItem?: string;
    itemValue?: string;
    isDarkMode: boolean; // ✅ NEW PROP
}

const NavItem: React.FC<NavItemProps> = ({
    icon,
    label,
    handleClick,
    currentItem,
    itemValue,
    isDarkMode,
}) => {
    const isActive =
        currentItem?.trim().toLowerCase() === itemValue?.trim().toLowerCase();

    return (
        <div
            className={`flex items-center px-2 py-2 mt-2 mb-2 rounded-lg cursor-pointer gap-4
        ${isActive
                    ? "bg-orange-100 text-neutral-900"
                    : isDarkMode
                        ? "text-white hover:bg-gray-700 hover:text-white"
                        : "text-gray-800 hover:bg-gray-100 hover:text-neutral-900"
                }`}
            onClick={() => handleClick?.(itemValue)}
        >
            <span>{icon}</span>
            <span className="text-lg align-middle">{label}</span>
        </div>
    );
};

export default NavItem;
