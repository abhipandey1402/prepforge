import { ReactNode } from "react";

interface NavItemProps {
    icon: ReactNode; // Path to the icon image
    label: string; // Label for the navigation item
    handleClick?: any;
    currentItem?: string;
    itemValue?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, handleClick, currentItem, itemValue }) => {
    return (
        <div
            className={`flex items-center px-2 py-2 mt-2 mb-2 rounded-lg cursor-pointer ${currentItem?.trim()?.toLowerCase() === itemValue?.trim()?.toLowerCase() ? "bg-orange-100 text-neutral-900" : "text-white hover:bg-gray-100 hover:text-neutral-900"
                } gap-4`}
            onClick={() => handleClick(itemValue)}
        >

            <span >{icon}</span>
            <span className="text-lg align-middle">{label}</span>
        </div>
    );
};

export default NavItem;