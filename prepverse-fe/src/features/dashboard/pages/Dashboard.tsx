import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { setCurrentItem } from "@/features/globalFeatures/slices/configSlice";
import LeetcodeSubmissions from "@/features/leetcode/pages/LeetcodeSubmissions";
import LeetcodeProblems from "@/features/leetcode/pages/LeetcodeProblems";
import ChatPage from "@/features/chat/pages/ChatPage";

const Dashboard = () => {
    const currentItem = useSelector((state: RootState) => state.config?.currentItem);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            if (event.currentTarget.performance.navigation.type === 1) {
                dispatch(setCurrentItem("submissions"));
            }
        };

        window.addEventListener("load", handleBeforeUnload);
        return () => {
            window.removeEventListener("load", handleBeforeUnload);
        };
    }, [dispatch]);

    const renderCurrentContent = () => {
        switch (currentItem) {
            case "submissions":
                return <LeetcodeSubmissions/>;
            case "practice":
                return <LeetcodeProblems/>;
            case "chats":
                // return <ChatPage/>
                return <ChatPage/>
            case "challengebetting":
                return <span>Challenge Betting</span>
            case "achievements":
                return <span>Achievements</span>
            case "notifications":
                return <span>Notifications</span>
            case "settings":
                return <span>Settings</span>
            default:
                return null;
        }
    }

    return (
        <div className="w-full bg-slate-600 flex box-border" style={{minHeight: 'calc(100vh)'}} >
            <Sidebar />
            <div style={{width: 'calc(100vw - 15rem)', height: 'calc(100vh - 1rem)' }} className="ml-56 mr-1 mt-2 mb-2 rounded-2xl bg-slate-950 text-white fixed">
                <div className="h-full overflow-y-auto custom-scrollbar">
                {renderCurrentContent()}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;