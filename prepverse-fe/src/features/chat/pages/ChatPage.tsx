import React, { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LocalStorage } from "../utils/index";
import { SOCKET_EVENTS } from "../constants/socketEvents";
import { useChatLogic } from "../hooks/useChatLogic";
import { useChatSocket } from "../hooks/useChatSocket";
import { SocketHandlers } from "../utils/socketHandlers";
import ChatWindow from "../components/ChatWindow";
import { LazyAddChatModal } from "../components/lazy";
import Typing from "../components/Typing";
import ChatSidebar1 from "../components/ChatSidebar";

const ChatPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth?.userData?.user);

    const [ , setIsConnected] = useState(false);
    const [openAddChat, setOpenAddChat] = useState(false);
    const [loadingChats] = useState(false);
    const [loadingMessages] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState("");

    const {
        currentChat,
        chats,
        messages,
        unreadMessages,
        isTyping,
        message,
        attachedFiles,
        setChats,
        setMessages,
        setUnreadMessages,
        setIsTyping,
        setAttachedFiles,
        updateChatLastMessage,
        updateChatLastMessageOnDeletion,
        getChats,
        getMessages,
        sendChatMessage,
        deleteChatMessage,
        handleOnMessageChange,
        selectChat,
    } = useChatLogic();

    // Initialize socket handlers
    const socketHandlers = new SocketHandlers(
        setIsConnected,
        setIsTyping,
        currentChat,
        setMessages,
        setUnreadMessages,
        setChats,
        updateChatLastMessage,
        updateChatLastMessageOnDeletion
    );

    const { socket } = useChatSocket({
        onConnect: socketHandlers.onConnect,
        onDisconnect: socketHandlers.onDisconnect,
        onTyping: socketHandlers.handleOnSocketTyping,
        onStopTyping: socketHandlers.handleOnSocketStopTyping,
        onMessageReceived: socketHandlers.onMessageReceived,
        onNewChat: socketHandlers.onNewChat,
        onChatLeave: socketHandlers.onChatLeave,
        onMessageDelete: socketHandlers.onMessageDelete,
        dependencies: [chats],
    });

    // Initialize chat on component mount
    useEffect(() => {
        getChats();
    }, []);

    // Load current chat from localStorage
    useEffect(() => {
        if (!socket) return;

        const _currentChat = LocalStorage.get("currentChat");
        if (_currentChat) {
            currentChat.current = _currentChat;
            socket.emit(SOCKET_EVENTS.JOIN_CHAT, _currentChat._id);
            getMessages(socket);
        }
    }, [socket]);

    const handleChatSelect = (chat: any) => {
        selectChat(chat, socket);
    };

    const handleChatDelete = (chatId: string) => {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId));
        if (currentChat.current?._id === chatId) {
            currentChat.current = null;
            LocalStorage.remove("currentChat");
        }
    };

    const handleSendMessage = () => {
        sendChatMessage(socket);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleOnMessageChange(e, socket);
    };

    return (
        <Suspense fallback={<Typing />}>
            <LazyAddChatModal
                open={openAddChat}
                onClose={() => setOpenAddChat(false)}
                onSuccess={() => getChats()}
            />

            <div className="w-full justify-between items-stretch h-screen flex flex-shrink-0">
                <ChatSidebar1
                    chats={chats}
                    currentChatId={currentChat.current?._id}
                    unreadMessages={unreadMessages}
                    localSearchQuery={localSearchQuery}
                    setLocalSearchQuery={setLocalSearchQuery}
                    setOpenAddChat={setOpenAddChat}
                    onChatSelect={handleChatSelect}
                    onChatDelete={handleChatDelete}
                    loadingChats={loadingChats}
                    user={user}
                />

                <ChatWindow
                    currentChat={currentChat.current}
                    messages={messages}
                    attachedFiles={attachedFiles}
                    setAttachedFiles={setAttachedFiles}
                    message={message}
                    handleOnMessageChange={handleMessageChange}
                    sendChatMessage={handleSendMessage}
                    deleteChatMessage={deleteChatMessage}
                    isTyping={isTyping}
                    loadingMessages={loadingMessages}
                    user={user}
                />
            </div>
        </Suspense>
    );
};

export default ChatPage;