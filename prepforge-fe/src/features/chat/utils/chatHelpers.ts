import { LocalStorage } from "./index";

export const chatHelpers = {
    saveCurrentChat: (chat: any) => {
        LocalStorage.set("currentChat", chat);
    },

    getCurrentChat: () => {
        return LocalStorage.get("currentChat");
    },

    removeCurrentChat: () => {
        LocalStorage.remove("currentChat");
    },

    filterChatsByQuery: (chats: any[], query: string, user: any, getChatObjectMetadata: any) => {
        return chats.filter((chat) =>
            query
                ? getChatObjectMetadata(chat, user)
                    .title?.toLowerCase()
                    ?.includes(query.toLowerCase())
                : true
        );
    },

    sortChatsByLastMessage: (chats: any[]) => {
        return [...chats].sort((a, b) => {
            const aTime = new Date(a.updatedAt || a.createdAt).getTime();
            const bTime = new Date(b.updatedAt || b.createdAt).getTime();
            return bTime - aTime;
        });
    },
};