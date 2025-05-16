import React from "react";
import { HomeIcon, SettingsIcon, MessageSquareIcon, Gamepad2Icon, BellIcon, Magnet, Monitor } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCurrentItem } from "@/features/globalFeatures/slices/configSlice";
import NavItem from "./NavItem";


const Sidebar: React.FC = () => {
    const currentItem = useSelector((state: RootState) => state.config?.currentItem);
    const dispatch = useDispatch();

    const handleItemClick = (item: string) => {
        dispatch(setCurrentItem(item));
    };

    return (
        <div style={{ height: 'calc(100vh - 1rem)' }} className="bg-slate-950 shadow-md w-[13rem] rounded-2xl fixed left-2 top-2 p-2 flex flex-col box-border">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => dispatch(setCurrentItem("dashboard"))} >
                <Monitor className="w-10 h-10 text-orange-500 animate-bounce" />
                <span className="text-xl text-white font-bold cursor-pointer mb-2">PrepVerse</span>
            </div>
            <nav>
                <NavItem icon={<HomeIcon size={20} />} label="Dashboard" handleClick={handleItemClick} currentItem={currentItem} itemValue="dashboard" />
                <NavItem icon={<Magnet size={20} />} label="Community" handleClick={handleItemClick} currentItem={currentItem} itemValue="community" />
                <NavItem icon={<MessageSquareIcon size={20} />} label="Chats" handleClick={handleItemClick} currentItem={currentItem} itemValue="chats" />
                <NavItem icon={<Gamepad2Icon size={20} />} label="Challenge Betting" handleClick={handleItemClick} currentItem={currentItem} itemValue="challengebetting" />
                <NavItem icon={<BellIcon size={20} />} label="Notifications" handleClick={handleItemClick} currentItem={currentItem} itemValue="notifications" />
                <NavItem icon={<SettingsIcon size={20} />} label="Settings" handleClick={handleItemClick} currentItem={currentItem} itemValue="settings" />
            </nav>
        </div>
    );
};

export default Sidebar;
