import React from "react";
import { HomeIcon, SettingsIcon, MessageSquareIcon, BrainCircuit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCurrentItem } from "@/features/globalFeatures/slices/configSlice";
import NavItem from "./NavItem";
import ThemeToggle from "@/features/globalFeatures/components/ThemeToggle";

type MyComponentProps = {
    isDarkMode: boolean;
};

const Sidebar: React.FC<MyComponentProps> = ({ isDarkMode }) => {
    const currentItem = useSelector((state: RootState) => state.config?.currentItem);
    const dispatch = useDispatch();

    const handleItemClick = (item: string) => {
        dispatch(setCurrentItem(item));
    };

    return (
        <div
            style={{ height: "calc(100vh - 1rem)" }}
            className={`shadow-md w-[13rem] rounded-2xl fixed left-2 top-2 p-2 flex flex-col box-border
        ${isDarkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-gray-800"}
      `}
        >
            <div
                className="flex items-center space-x-2 cursor-pointer mb-4"
                onClick={() => dispatch(setCurrentItem("submissions"))}
            >
                <img src="https://res.cloudinary.com/dbzi19ec6/image/upload/v1752592047/icon128_vsu3tt.png" className='w-8 h-8 rounded' />
                <span className="text-xl font-bold cursor-pointer mb-2">PrepForge</span>
            </div>
            <nav>
                <NavItem
                    icon={<HomeIcon size={20} />}
                    label="My Submissions"
                    handleClick={handleItemClick}
                    currentItem={currentItem}
                    itemValue="submissions"
                    isDarkMode={isDarkMode}
                />
                <NavItem
                    icon={<BrainCircuit size={20} />}
                    label="Practice"
                    handleClick={handleItemClick}
                    currentItem={currentItem}
                    itemValue="practice"
                    isDarkMode={isDarkMode}
                />
                <NavItem
                    icon={<MessageSquareIcon size={20} />}
                    label="Chats"
                    handleClick={handleItemClick}
                    currentItem={currentItem}
                    itemValue="chats"
                    isDarkMode={isDarkMode}
                />
                {/* <NavItem icon={<BellIcon size={20} />} label="Notifications" handleClick={handleItemClick} currentItem={currentItem} itemValue="notifications" /> */}
                <NavItem
                    icon={<SettingsIcon size={20} />}
                    label="Settings"
                    handleClick={handleItemClick}
                    currentItem={currentItem}
                    itemValue="settings"
                    isDarkMode={isDarkMode}
                />
                <div className="w-full flex flex-col gap-2 items-center absolute left-0 bottom-1">
                    <ThemeToggle />
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
