export const SOCKET_EVENTS = {
    CONNECTED: "connected",
    DISCONNECT: "disconnect",
    JOIN_CHAT: "joinChat",
    NEW_CHAT: "newChat",
    TYPING: "typing",
    STOP_TYPING: "stopTyping",
    MESSAGE_RECEIVED: "messageReceived",
    LEAVE_CHAT: "leaveChat",
    MESSAGE_DELETE: "messageDeleted",
} as const;