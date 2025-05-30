
export const isBrowser = typeof window !== "undefined";

export class LocalStorage {
    static get(key: string) {
        if (!isBrowser) return;
        const value = localStorage.getItem(key);
        if (value) {
            try {
                return JSON.parse(value);
            } catch (err) {
                return null;
            }
        }
        return null;
    }

    static set(key: string, value: any) {
        if (!isBrowser) return;
        localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key: string) {
        if (!isBrowser) return;
        localStorage.removeItem(key);
    }

    static clear() {
        if (!isBrowser) return;
        localStorage.clear();
    }
}

export const classNames = (...className: string[]) => {
    // Filter out any empty class names and join them with a space
    return className.filter(Boolean).join(" ");
};

// This utility function generates metadata for chat objects.
export const getChatObjectMetadata = (
    chat: any,
    loggedInUser: any
) => {

    const lastMessage = chat.lastMessage?.content
        ? chat.lastMessage?.content
        : chat.lastMessage
            ? `${chat.lastMessage?.attachments?.length} attachment${chat.lastMessage.attachments.length > 1 ? "s" : ""
            }`
            : "No messages yet";

    if (chat.isGroupChat) {
        return {
            avatar: "https://via.placeholder.com/100x100.png",
            title: chat.name,
            description: `${chat.participants.length} members in the chat`,
            lastMessage: chat.lastMessage
                ? chat.lastMessage?.sender?.username + ": " + lastMessage
                : lastMessage,
        };
    } else {
        const participant = chat.participants.find(
            (p: any) => p._id !== loggedInUser?._id
        );
        
        return {
            avatar: participant?.avatarUrl,
            title: participant?.username,
            description: participant?.email,
            lastMessage,
        };
    }
};