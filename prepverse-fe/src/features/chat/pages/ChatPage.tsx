import {
    SendIcon,
    XCircleIcon,
    PaperclipIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AddChatModal from "../components/AddChatModal";
import ChatItem from "../components/ChatItem";
import MessageItem from "../components/MessageItem";
import Typing from "../components/Typing";
import Input from "../commonComponents/Input";
import { useSocket } from "../utils/SocketContext";
import {
    LocalStorage,
    classNames,
    getChatObjectMetadata,
} from "../utils/index";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetUserChats } from "../hooks/useGetUserChats";
import { useSendMessage } from "../hooks/useSendMessage";
import { useGetChatMessages } from "../hooks/useGetChatMessages";
import { useDeleteMessage } from "../hooks/useDeleteMessage";
import { toast } from "react-toastify";

const CONNECTED_EVENT = "connected";
const DISCONNECT_EVENT = "disconnect";
const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const TYPING_EVENT = "typing";
const STOP_TYPING_EVENT = "stopTyping";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const LEAVE_CHAT_EVENT = "leaveChat";
// const UPDATE_GROUP_NAME_EVENT = "updateGroupName";
const MESSAGE_DELETE_EVENT = "messageDeleted";

const ChatPage = () => {
    const user = useSelector((state: RootState) => state.auth?.userData?.user);
    const { socket } = useSocket();


    const currentChat = useRef<any | null>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const [openAddChat, setOpenAddChat] = useState(false);
    const [loadingChats] = useState(false);
    const [loadingMessages] = useState(false);

    const [chats, setChats] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [unreadMessages, setUnreadMessages] = useState<any[]>(
        []
    );

    const [isTyping, setIsTyping] = useState(false);
    const [selfTyping, setSelfTyping] = useState(false);

    const [message, setMessage] = useState("");
    const [localSearchQuery, setLocalSearchQuery] = useState("");

    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

    const { getUserChats } = useGetUserChats();
    const { sendMessage } = useSendMessage();
    const { getChatMessages } = useGetChatMessages();
    const { deleteMessage } = useDeleteMessage();

    const updateChatLastMessage = (
        chatToUpdateId: string,
        message: any
    ) => {
        // Search for the chat with the given ID in the chats array
        const chatToUpdate = chats.find((chat) => chat._id === chatToUpdateId)!;

        // Update the 'lastMessage' field of the found chat with the new message
        chatToUpdate.lastMessage = message;

        // Update the 'updatedAt' field of the chat with the 'updatedAt' field from the message
        chatToUpdate.updatedAt = message?.updatedAt;

        // Update the state of chats, placing the updated chat at the beginning of the array
        setChats([
            chatToUpdate,
            ...chats.filter((chat) => chat._id !== chatToUpdateId), // Include all other chats except the updated one
        ]);
    };

    // A function to update the chats last message specifically in case of deletion of message
    const updateChatLastMessageOnDeletion = async (
        chatToUpdateId: string,
        message: any
    ) => {
        // Search for the chat with the given ID in the chats array
        try {
            const chatToUpdate = chats.find((chat) => chat._id === chatToUpdateId)!;

            //Updating the last message of chat only in case of deleted message and chats last message is same
            if (chatToUpdate.lastMessage?._id === message._id) {
                const messages = await getChatMessages(chatToUpdateId);
                if (messages) {
                    chatToUpdate.lastMessage = messages[0];
                    setChats([...chats]);
                }
            }
        } catch (err: any) {
            toast.error("Error occured", err);
        }
    };

    const getChats = async () => {
        try {
            const res = await getUserChats();
            if (res) {
                setChats(res);
            }
        } catch (err: any) {
            toast.error("Error occured", err);
        }
    };

    const getMessages = async () => {
        if (!currentChat.current?._id) {
            toast.warning("No chat is selected");
            return;
        }

        if (!socket) {
            toast.warning("Socket not available");
            return;
        }

        try {
            // Emit an event to join the current chat
            socket && socket.emit(JOIN_CHAT_EVENT, currentChat.current?._id);

            // Filter out unread messages from the current chat as those will be read
            setUnreadMessages(
                unreadMessages.filter((msg) => msg.chat !== currentChat.current?._id)
            );

            const messages = await getChatMessages(currentChat.current?._id || "");
            if (messages) {
                setMessages(messages || []);
            }
        } catch (err: any) {
            toast.error("Error occured", err);
        }
    };

    const sendChatMessage = async () => {
        if (!currentChat.current?._id || !socket) return;

        try {
            // Emit a STOP_TYPING_EVENT to inform other users/participants that typing has stopped
            socket.emit(STOP_TYPING_EVENT, currentChat.current?._id);

            const res = await sendMessage(currentChat.current?._id || "", message, attachedFiles);

            if (res) {
                setMessage("");
                setAttachedFiles([]);
                setMessages((prev) => [res.data, ...prev]);
                updateChatLastMessage(currentChat.current?._id || "", res.data);
            }

        } catch (err: any) {
            toast.error("Error occured", err);
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
            toast.error("Error occured", err);
        }
    };

    const handleOnMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update the message state with the current input value
        setMessage(e.target.value);

        // If socket doesn't exist or isn't connected, exit the function
        if (!socket || !isConnected) return;

        // Check if the user isn't already set as typing
        if (!selfTyping) {
            // Set the user as typing
            setSelfTyping(true);

            // Emit a typing event to the server for the current chat
            socket.emit(TYPING_EVENT, currentChat.current?._id);
        }

        // Clear the previous timeout (if exists) to avoid multiple setTimeouts from running
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Define a length of time (in milliseconds) for the typing timeout
        const timerLength = 3000;

        // Set a timeout to stop the typing indication after the timerLength has passed
        typingTimeoutRef.current = setTimeout(() => {
            // Emit a stop typing event to the server for the current chat
            socket.emit(STOP_TYPING_EVENT, currentChat.current?._id);

            // Reset the user's typing state
            setSelfTyping(false);
        }, timerLength);
    };

    const onConnect = () => {
        console.log("Connected it");
        setIsConnected(true);
    };

    const onDisconnect = () => {
        setIsConnected(false);
    };

    // Handles the "typing" event on the socket.
    const handleOnSocketTyping = (chatId: string) => {
        console.log(chatId, "Typing something by abhi...");
        if (chatId === currentChat.current?._id) {
            setIsTyping(true);
        }
    };

    // Handles the "stop typing" event on the socket.
    const handleOnSocketStopTyping = (chatId: string) => {
        console.log(chatId, "Stopped typing");
        if (chatId === currentChat.current?._id) {
            setIsTyping(false);
        }
    };

    const onMessageDelete = (message: any) => {
        if (message?.chat !== currentChat.current?._id) {
            setUnreadMessages((prev) =>
                prev.filter((msg) => msg._id !== message._id)
            );
        } else {
            setMessages((prev) => prev.filter((msg) => msg._id !== message._id));
        }

        updateChatLastMessageOnDeletion(message.chat, message);
    };

    // Handles the event when a new message is received.
    const onMessageReceived = (message: any) => {
        // Check if the received message belongs to the currently active chat
        if (message?.chat !== currentChat.current?._id) {
            // If not, update the list of unread messages
            setUnreadMessages((prev) => [message, ...prev]);
        } else {
            // If it belongs to the current chat, update the messages list for the active chat
            setMessages((prev) => [message, ...prev]);
        }

        // Update the last message for the chat to which the received message belongs
        updateChatLastMessage(message.chat || "", message);
    };

    const onNewChat = (chat: any) => {
        setChats((prev) => [chat, ...prev]);
    };

    // This function handles the event when a user leaves a chat.
    const onChatLeave = (chat: any) => {
        // Check if the chat the user is leaving is the current active chat.
        if (chat._id === currentChat.current?._id) {
            // If the user is in the group chat they're leaving, close the chat window.
            currentChat.current = null;
            // Remove the currentChat from local storage.
            LocalStorage.remove("currentChat");
        }
        // Update the chats by removing the chat that the user left.
        setChats((prev) => prev.filter((c) => c._id !== chat._id));
    };

    // // Function to handle changes in group name
    // const onGroupNameChange = (chat: any) => {
    //     // Check if the chat being changed is the currently active chat
    //     if (chat._id === currentChat.current?._id) {
    //         // Update the current chat with the new details
    //         currentChat.current = chat;

    //         // Save the updated chat details to local storage
    //         LocalStorage.set("currentChat", chat);
    //     }

    //     // Update the list of chats with the new chat details
    //     setChats((prev) => [
    //         // Map through the previous chats
    //         ...prev.map((c) => {
    //             // If the current chat in the map matches the chat being changed, return the updated chat
    //             if (c._id === chat._id) {
    //                 return chat;
    //             }
    //             // Otherwise, return the chat as-is without any changes
    //             return c;
    //         }),
    //     ]);
    // };

    useEffect(() => {
        getChats();

        const _currentChat = LocalStorage.get("currentChat");

        if (_currentChat) {
            currentChat.current = _currentChat;
            socket?.emit(JOIN_CHAT_EVENT, _currentChat.current?._id);
            getMessages();
        }
    }, []);


    useEffect(() => {
        if (!socket) {
            console.error("Socket not initialized")
            return;
        }

        const handleSocketEvents = () => {
            socket.on(CONNECTED_EVENT, onConnect);
            socket.on(DISCONNECT_EVENT, onDisconnect);
            socket.on(TYPING_EVENT, handleOnSocketTyping);
            socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
            socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
            socket.on(NEW_CHAT_EVENT, onNewChat);
            socket.on(LEAVE_CHAT_EVENT, onChatLeave);
            socket.on(MESSAGE_DELETE_EVENT, onMessageDelete);
        };

        handleSocketEvents();

        return () => {
            socket.off(CONNECTED_EVENT);
            socket.off(DISCONNECT_EVENT);
            socket.off(TYPING_EVENT);
            socket.off(STOP_TYPING_EVENT);
            socket.off(MESSAGE_RECEIVED_EVENT);
            socket.off(NEW_CHAT_EVENT);
            socket.off(LEAVE_CHAT_EVENT);
            socket.off(MESSAGE_DELETE_EVENT);
        };

        // Note:
        // The `chats` array is used in the `onMessageReceived` function.
        // We need the latest state value of `chats`. If we don't pass `chats` in the dependency array,
        // the `onMessageReceived` will consider the initial value of the `chats` array, which is empty.
        // This will not cause infinite renders because the functions in the socket are getting mounted and not executed.
        // So, even if some socket callbacks are updating the `chats` state, it's not
        // updating on each `useEffect` call but on each socket call.
    }, [socket, chats]);

    return (
        <>
            <AddChatModal
                open={openAddChat}
                onClose={() => {
                    setOpenAddChat(false);
                }}
                onSuccess={() => {
                    getChats();
                }}
            />

            <div className="w-full justify-between items-stretch h-screen flex flex-shrink-0">
                <div className="w-1/3 relative ring-white overflow-y-auto px-4">
                    <div className="z-10 w-full sticky top-0 bg-dark py-4 flex justify-between items-center gap-4">

                        <Input
                            placeholder="Search user or group..."
                            value={localSearchQuery}
                            onChange={(e: any) =>
                                setLocalSearchQuery(e.target.value.toLowerCase())
                            }
                        />
                        <button
                            onClick={() => setOpenAddChat(true)}
                            className="rounded-xl border-none bg-primary text-white py-4 px-5 flex flex-shrink-0"
                        >
                            + Add chat
                        </button>
                    </div>
                    {loadingChats ? (
                        <div className="flex justify-center items-center h-[calc(100%-88px)]">
                            <Typing />
                        </div>
                    ) : (
                        // Iterating over the chats array
                        [...chats]
                            // Filtering chats based on a local search query
                            .filter((chat) =>
                                // If there's a localSearchQuery, filter chats that contain the query in their metadata title
                                localSearchQuery
                                    ? getChatObjectMetadata(chat, user!)
                                        .title?.toLocaleLowerCase()
                                        ?.includes(localSearchQuery)
                                    : // If there's no localSearchQuery, include all chats
                                    true
                            )
                            .map((chat) => {
                                return (
                                    <ChatItem
                                        chat={chat}
                                        isActive={chat._id === currentChat.current?._id}
                                        unreadCount={
                                            unreadMessages.filter((n) => n.chat === chat._id).length
                                        }
                                        onClick={(chat: any) => {
                                            if (
                                                currentChat.current?._id &&
                                                currentChat.current?._id === chat._id
                                            )
                                                return;
                                            LocalStorage.set("currentChat", chat);
                                            currentChat.current = chat;
                                            setMessage("");
                                            getMessages();
                                        }}
                                        key={chat._id}
                                        onChatDelete={(chatId: any) => {
                                            setChats((prev) =>
                                                prev.filter((chat) => chat._id !== chatId)
                                            );
                                            if (currentChat.current?._id === chatId) {
                                                currentChat.current = null;
                                                LocalStorage.remove("currentChat");
                                            }
                                        }}
                                    />
                                );
                            })
                    )}
                </div>
                <div className="w-2/3 border-l-[0.1px] border-secondary">
                    {currentChat.current && currentChat.current?._id ? (
                        <>
                            <div className="p-4 sticky top-0 bg-dark z-20 flex justify-between items-center w-full border-b-[0.1px] border-secondary">
                                <div className="flex justify-start items-center w-max gap-3">
                                    {currentChat.current.isGroupChat ? (
                                        <div className="w-12 relative h-12 flex-shrink-0 flex justify-start items-center flex-nowrap">
                                            {currentChat.current.participants
                                                .slice(0, 3)
                                                .map((participant: any, i: any) => {
                                                    return (
                                                        <img
                                                            key={participant._id}
                                                            src={participant?.avatarUrl}
                                                            className={classNames(
                                                                "w-9 h-9 border-[1px] border-white rounded-full absolute outline outline-4 outline-dark",
                                                                i === 0
                                                                    ? "left-0 z-30"
                                                                    : i === 1
                                                                        ? "left-2 z-20"
                                                                        : i === 2
                                                                            ? "left-4 z-10"
                                                                            : ""
                                                            )}
                                                        />
                                                    );
                                                })}
                                        </div>
                                    ) : (
                                        <img
                                            className="h-14 w-14 rounded-full flex flex-shrink-0 object-cover"
                                            src={
                                                getChatObjectMetadata(currentChat.current, user!).avatar
                                            }
                                        />
                                    )}
                                    <div>
                                        <p className="font-bold">
                                            {getChatObjectMetadata(currentChat.current, user!).title}
                                        </p>
                                        <small className="text-zinc-400">
                                            {
                                                getChatObjectMetadata(currentChat.current, user!)
                                                    .description
                                            }
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={classNames(
                                    "p-8 overflow-y-auto flex flex-col-reverse gap-6 w-full",
                                    attachedFiles.length > 0
                                        ? "h-[calc(100vh-336px)]"
                                        : "h-[calc(100vh-176px)]"
                                )}
                                id="message-window"
                            >
                                {loadingMessages ? (
                                    <div className="flex justify-center items-center h-[calc(100%-88px)]">
                                        <Typing />
                                    </div>
                                ) : (
                                    <>
                                        {isTyping ? <Typing /> : null}
                                        {messages?.map((msg) => {
                                            return (
                                                <MessageItem
                                                    key={msg._id}
                                                    isOwnMessage={msg.sender?._id === user?._id}
                                                    isGroupChatMessage={currentChat.current?.isGroupChat}
                                                    message={msg}
                                                    deleteChatMessage={deleteChatMessage}
                                                />
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                            {attachedFiles.length > 0 ? (
                                <div className="grid gap-4 grid-cols-5 p-4 justify-start max-w-fit">
                                    {attachedFiles.map((file, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="group w-32 h-32 relative aspect-square rounded-xl cursor-pointer"
                                            >
                                                <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-black/40 group-hover:opacity-100 opacity-0 transition-opacity ease-in-out duration-150">
                                                    <button
                                                        onClick={() => {
                                                            setAttachedFiles(
                                                                attachedFiles.filter((_, ind) => ind !== i)
                                                            );
                                                        }}
                                                        className="absolute -top-2 -right-2"
                                                    >
                                                        <XCircleIcon className="h-6 w-6 text-white" />
                                                    </button>
                                                </div>
                                                <img
                                                    className="h-full rounded-xl w-full object-cover"
                                                    src={URL.createObjectURL(file)}
                                                    alt="attachment"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : null}
                            <div className="sticky top-full p-4 flex justify-between items-center w-full gap-2 border-t-[0.1px] border-secondary">
                                <input
                                    hidden
                                    id="attachments"
                                    type="file"
                                    value=""
                                    multiple
                                    max={5}
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setAttachedFiles([...e.target.files]);
                                        }
                                    }}
                                />
                                <label
                                    htmlFor="attachments"
                                    className="p-4 rounded-full bg-dark hover:bg-secondary"
                                >
                                    <PaperclipIcon className="w-6 h-6" />
                                </label>

                                <Input
                                    placeholder="Message"
                                    value={message}
                                    onChange={handleOnMessageChange}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            sendChatMessage();
                                        }
                                    }}
                                />
                                <button
                                    onClick={sendChatMessage}
                                    disabled={!message && attachedFiles.length <= 0}
                                    className="p-4 rounded-full bg-dark hover:bg-secondary disabled:opacity-50"
                                >
                                    <SendIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex justify-center items-center">
                            No chat selected
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatPage;
