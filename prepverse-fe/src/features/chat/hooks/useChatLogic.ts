import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { LocalStorage } from "../utils/index";
import { SOCKET_EVENTS } from "../constants/socketEvents";
import { useGetUserChats } from "./useGetUserChats";
import { useSendMessage } from "./useSendMessage";
import { useGetChatMessages } from "./useGetChatMessages";
import { useDeleteMessage } from "./useDeleteMessage";

export const useChatLogic = () => {
    const currentChat = useRef<any | null>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [chats, setChats] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [unreadMessages, setUnreadMessages] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [selfTyping, setSelfTyping] = useState(false);
    const [message, setMessage] = useState("");
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

    const { getUserChats } = useGetUserChats();
    const { sendMessage } = useSendMessage();
    const { getChatMessages } = useGetChatMessages();
    const { deleteMessage } = useDeleteMessage();

    const updateChatLastMessage = (chatToUpdateId: string, message: any) => {
        const chatToUpdate = chats.find((chat) => chat._id === chatToUpdateId)!;
        chatToUpdate.lastMessage = message;
        chatToUpdate.updatedAt = message?.updatedAt;

        setChats([
            chatToUpdate,
            ...chats.filter((chat) => chat._id !== chatToUpdateId),
        ]);
    };

    const updateChatLastMessageOnDeletion = async (
        chatToUpdateId: string,
        message: any
    ) => {
        try {
            const chatToUpdate = chats.find((chat) => chat._id === chatToUpdateId)!;

            if (chatToUpdate.lastMessage?._id === message._id) {
                const messages = await getChatMessages(chatToUpdateId);
                if (messages) {
                    chatToUpdate.lastMessage = messages[0];
                    setChats([...chats]);
                }
            }
        } catch (err: any) {
            toast.error("Error occurred", err);
        }
    };

    const getChats = async () => {
        try {
            const res = await getUserChats();
            if (res) {
                setChats(res);
            }
        } catch (err: any) {
            toast.error("Error occurred", err);
        }
    };

    const getMessages = async (socket?: any) => {
        if (!currentChat.current?._id) {
            toast.warning("No chat is selected");
            return;
        }

        if (!socket) {
            toast.warning("Socket not available");
            return;
        }

        try {
            socket.emit(SOCKET_EVENTS.JOIN_CHAT, currentChat.current?._id);

            setUnreadMessages(
                unreadMessages.filter((msg) => msg.chat !== currentChat.current?._id)
            );

            const messages = await getChatMessages(currentChat.current?._id || "");
            if (messages) {
                setMessages(messages || []);
            }
        } catch (err: any) {
            toast.error("Error occurred", err);
        }
    };

    const sendChatMessage = async (socket?: any) => {
        if (!currentChat.current?._id || !socket) return;

        try {
            socket.emit(SOCKET_EVENTS.STOP_TYPING, currentChat.current?._id);

            const res = await sendMessage(
                currentChat.current?._id || "",
                message,
                attachedFiles
            );

            if (res) {
                setMessage("");
                setAttachedFiles([]);
                setMessages((prev) => [res.data, ...prev]);
                updateChatLastMessage(currentChat.current?._id || "", res.data);
            }
        } catch (err: any) {
            toast.error("Error occurred", err);
        }
    };

    const deleteChatMessage = async (message: any) => {
        try {
            const res = await deleteMessage(message?.chat, message?._id);
            if (res) {
                setMessages((prev) => prev.filter((msg) => msg._id !== res.data._id));
                updateChatLastMessageOnDeletion(message.chat, message);
            }
        } catch (err: any) {
            toast.error("Error occurred", err);
        }
    };

    const handleOnMessageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        socket?: any
    ) => {
        setMessage(e.target.value);

        if (!socket) return;

        if (!selfTyping) {
            setSelfTyping(true);
            socket.emit(SOCKET_EVENTS.TYPING, currentChat.current?._id);
        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        const timerLength = 3000;

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit(SOCKET_EVENTS.STOP_TYPING, currentChat.current?._id);
            setSelfTyping(false);
        }, timerLength);
    };

    const selectChat = (chat: any, socket?: any) => {
        if (currentChat.current?._id && currentChat.current?._id === chat._id)
            return;

        LocalStorage.set("currentChat", chat);
        currentChat.current = chat;
        setMessage("");
        getMessages(socket);
    };

    return {
        // State
        currentChat,
        chats,
        messages,
        unreadMessages,
        isTyping,
        selfTyping,
        message,
        attachedFiles,
        // Setters
        setChats,
        setMessages,
        setUnreadMessages,
        setIsTyping,
        setSelfTyping,
        setMessage,
        setAttachedFiles,
        // Functions
        updateChatLastMessage,
        updateChatLastMessageOnDeletion,
        getChats,
        getMessages,
        sendChatMessage,
        deleteChatMessage,
        handleOnMessageChange,
        selectChat,
    };
};