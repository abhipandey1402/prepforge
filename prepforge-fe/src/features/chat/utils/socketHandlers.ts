import { LocalStorage } from "./index";

export class SocketHandlers {
    private setIsConnected: (connected: boolean) => void;
    private setIsTyping: (typing: boolean) => void;
    private currentChat: React.MutableRefObject<any>;
    private setMessages: React.Dispatch<React.SetStateAction<any[]>>;
    private setUnreadMessages: React.Dispatch<React.SetStateAction<any[]>>;
    private setChats: React.Dispatch<React.SetStateAction<any[]>>;
    private updateChatLastMessage: (chatId: string, message: any) => void;
    private updateChatLastMessageOnDeletion: (chatId: string, message: any) => void;

    constructor(
        setIsConnected: (connected: boolean) => void,
        setIsTyping: (typing: boolean) => void,
        currentChat: React.MutableRefObject<any>,
        setMessages: React.Dispatch<React.SetStateAction<any[]>>,
        setUnreadMessages: React.Dispatch<React.SetStateAction<any[]>>,
        setChats: React.Dispatch<React.SetStateAction<any[]>>,
        updateChatLastMessage: (chatId: string, message: any) => void,
        updateChatLastMessageOnDeletion: (chatId: string, message: any) => void
    ) {
        this.setIsConnected = setIsConnected;
        this.setIsTyping = setIsTyping;
        this.currentChat = currentChat;
        this.setMessages = setMessages;
        this.setUnreadMessages = setUnreadMessages;
        this.setChats = setChats;
        this.updateChatLastMessage = updateChatLastMessage;
        this.updateChatLastMessageOnDeletion = updateChatLastMessageOnDeletion;
    }

    onConnect = () => {
        console.log("Connected");
        this.setIsConnected(true);
    };

    onDisconnect = () => {
        console.log("Disconnected");
        this.setIsConnected(false);
    };

    handleOnSocketTyping = (chatId: string) => {
        console.log(chatId, "Typing...");
        if (chatId === this.currentChat.current?._id) {
            this.setIsTyping(true);
        }
    };

    handleOnSocketStopTyping = (chatId: string) => {
        console.log(chatId, "Stopped typing");
        if (chatId === this.currentChat.current?._id) {
            this.setIsTyping(false);
        }
    };

    onMessageDelete = (message: any) => {
        if (message?.chat !== this.currentChat.current?._id) {
            this.setUnreadMessages((prev) =>
                prev.filter((msg) => msg._id !== message._id)
            );
        } else {
            this.setMessages((prev) => prev.filter((msg) => msg._id !== message._id));
        }

        this.updateChatLastMessageOnDeletion(message.chat, message);
    };

    onMessageReceived = (message: any) => {
        if (message?.chat !== this.currentChat.current?._id) {
            this.setUnreadMessages((prev) => [message, ...prev]);
        } else {
            this.setMessages((prev) => [message, ...prev]);
        }

        this.updateChatLastMessage(message.chat || "", message);
    };

    onNewChat = (chat: any) => {
        this.setChats((prev) => [chat, ...prev]);
    };

    onChatLeave = (chat: any) => {
        if (chat._id === this.currentChat.current?._id) {
            this.currentChat.current = null;
            LocalStorage.remove("currentChat");
        }
        this.setChats((prev) => prev.filter((c) => c._id !== chat._id));
    };
}