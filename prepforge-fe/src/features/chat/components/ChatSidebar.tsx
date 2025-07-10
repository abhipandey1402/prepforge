import React, { Suspense } from "react";
import { getChatObjectMetadata } from "../utils/index";
import Input from "../commonComponents/Input";
import Typing from "./Typing";
import { LazyChatItem } from "./lazy";

interface ChatSidebarProps {
    chats: any[];
    currentChatId: string | null;
    unreadMessages: any[];
    localSearchQuery: string;
    setLocalSearchQuery: (query: string) => void;
    setOpenAddChat: (open: boolean) => void;
    onChatSelect: (chat: any) => void;
    onChatDelete: (chatId: string) => void;
    loadingChats: boolean;
    user: any;
    isDarkMode: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    chats,
    currentChatId,
    unreadMessages,
    localSearchQuery,
    setLocalSearchQuery,
    setOpenAddChat,
    onChatSelect,
    onChatDelete,
    loadingChats,
    user,
    isDarkMode,
}) => {
    const filteredChats = chats.filter((chat) =>
        localSearchQuery
            ? getChatObjectMetadata(chat, user)
                .title?.toLowerCase()
                ?.includes(localSearchQuery)
            : true
    );

    return (
        <div className={`w-1/3 relative overflow-y-auto px-4`}>
            <div className="z-10 w-full sticky top-0 bg-dark py-4 flex justify-between items-center gap-4">
                <Input
                    placeholder="Search user or group..."
                    value={localSearchQuery}
                    onChange={(e: any) => setLocalSearchQuery(e.target.value.toLowerCase())}
                />
                <button
                    onClick={() => setOpenAddChat(true)}
                    className={`rounded-xl border-none ${isDarkMode ? "bg-primary text-white" : "bg-slate-200 text-gray-800"} py-4 px-5 flex flex-shrink-0`}
                >
                    + Add chat
                </button>
            </div>

            {loadingChats ? (
                <div className="flex justify-center items-center h-[calc(100%-88px)]">
                    <Typing />
                </div>
            ) : (
                <Suspense fallback={<Typing />}>
                    {filteredChats.map((chat) => (
                        <LazyChatItem
                            key={chat._id}
                            chat={chat}
                            isActive={chat._id === currentChatId}
                            unreadCount={
                                unreadMessages.filter((n) => n.chat === chat._id).length
                            }
                            onClick={onChatSelect}
                            onChatDelete={onChatDelete}
                            isDarkMode={isDarkMode}
                        />
                    ))}
                </Suspense>
            )}
        </div>
    );
};

export default ChatSidebar;