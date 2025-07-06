import { useEffect } from "react";
import { useSocket } from "../utils/SocketContext";
import { SOCKET_EVENTS } from "../constants/socketEvents";

interface UseChatSocketProps {
    onConnect: () => void;
    onDisconnect: () => void;
    onTyping: (chatId: string) => void;
    onStopTyping: (chatId: string) => void;
    onMessageReceived: (message: any) => void;
    onNewChat: (chat: any) => void;
    onChatLeave: (chat: any) => void;
    onMessageDelete: (message: any) => void;
    dependencies?: any[];
}

export const useChatSocket = ({
    onConnect,
    onDisconnect,
    onTyping,
    onStopTyping,
    onMessageReceived,
    onNewChat,
    onChatLeave,
    onMessageDelete,
    dependencies = [],
}: UseChatSocketProps) => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) {
            console.error("Socket not initialized");
            return;
        }

        const handleSocketEvents = () => {
            socket.on(SOCKET_EVENTS.CONNECTED, onConnect);
            socket.on(SOCKET_EVENTS.DISCONNECT, onDisconnect);
            socket.on(SOCKET_EVENTS.TYPING, onTyping);
            socket.on(SOCKET_EVENTS.STOP_TYPING, onStopTyping);
            socket.on(SOCKET_EVENTS.MESSAGE_RECEIVED, onMessageReceived);
            socket.on(SOCKET_EVENTS.NEW_CHAT, onNewChat);
            socket.on(SOCKET_EVENTS.LEAVE_CHAT, onChatLeave);
            socket.on(SOCKET_EVENTS.MESSAGE_DELETE, onMessageDelete);
        };

        handleSocketEvents();

        return () => {
            socket.off(SOCKET_EVENTS.CONNECTED);
            socket.off(SOCKET_EVENTS.DISCONNECT);
            socket.off(SOCKET_EVENTS.TYPING);
            socket.off(SOCKET_EVENTS.STOP_TYPING);
            socket.off(SOCKET_EVENTS.MESSAGE_RECEIVED);
            socket.off(SOCKET_EVENTS.NEW_CHAT);
            socket.off(SOCKET_EVENTS.LEAVE_CHAT);
            socket.off(SOCKET_EVENTS.MESSAGE_DELETE);
        };
    }, [socket, ...dependencies]);

    return { socket };
};