import React, { Suspense } from "react";
import { SendIcon, XCircleIcon, PaperclipIcon } from "lucide-react";
import { getChatObjectMetadata, classNames } from "../utils/index";
import Input from "../commonComponents/Input";
import Typing from "./Typing";
import { LazyMessageItem } from "./lazy";

interface ChatWindowProps {
    currentChat: any;
    messages: any[];
    attachedFiles: File[];
    setAttachedFiles: (files: File[]) => void;
    message: string;
    handleOnMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sendChatMessage: () => void;
    deleteChatMessage: (message: any) => void;
    isTyping: boolean;
    loadingMessages: boolean;
    user: any;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
    currentChat,
    messages,
    attachedFiles,
    setAttachedFiles,
    message,
    handleOnMessageChange,
    sendChatMessage,
    deleteChatMessage,
    isTyping,
    loadingMessages,
    user,
}) => {
    if (!currentChat?._id) {
        return (
            <div className="w-2/3 border-l-[0.1px] border-secondary">
                <div className="w-full h-full flex justify-center items-center">
                    No chat selected
                </div>
            </div>
        );
    }

    return (
        <div className="w-2/3 border-l-[0.1px] border-secondary">
            {/* Chat Header */}
            <div className="p-4 sticky top-0 bg-dark z-20 flex justify-between items-center w-full border-b-[0.1px] border-secondary">
                <div className="flex justify-start items-center w-max gap-3">
                    {currentChat.isGroupChat ? (
                        <div className="w-12 relative h-12 flex-shrink-0 flex justify-start items-center flex-nowrap">
                            {currentChat.participants.slice(0, 3).map((participant: any, i: any) => (
                                <img
                                    key={participant._id}
                                    src={participant?.avatarUrl}
                                    className={classNames(
                                        "w-9 h-9 border-[1px] border-white rounded-full absolute outline-4 outline-dark",
                                        i === 0 ? "left-0 z-30" : i === 1 ? "left-2 z-20" : i === 2 ? "left-4 z-10" : ""
                                    )}
                                />
                            ))}
                        </div>
                    ) : (
                        <img
                            className="h-14 w-14 rounded-full flex flex-shrink-0 object-cover"
                            src={getChatObjectMetadata(currentChat, user).avatar}
                        />
                    )}
                    <div>
                        <p className="font-bold">
                            {getChatObjectMetadata(currentChat, user).title}
                        </p>
                        <small className="text-zinc-400">
                            {getChatObjectMetadata(currentChat, user).description}
                        </small>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div
                className={classNames(
                    "p-8 overflow-y-auto flex flex-col-reverse gap-6 w-full",
                    attachedFiles.length > 0 ? "h-[calc(100vh-336px)]" : "h-[calc(100vh-176px)]"
                )}
                id="message-window"
            >
                {loadingMessages ? (
                    <div className="flex justify-center items-center h-[calc(100%-88px)]">
                        <Typing />
                    </div>
                ) : (
                    <Suspense fallback={<Typing />}>
                        {isTyping && <Typing />}
                        {messages?.map((msg) => (
                            <LazyMessageItem
                                key={msg._id}
                                isOwnMessage={msg.sender?._id === user?._id}
                                isGroupChatMessage={currentChat?.isGroupChat}
                                message={msg}
                                deleteChatMessage={deleteChatMessage}
                            />
                        ))}
                    </Suspense>
                )}
            </div>

            {/* Attached Files Preview */}
            {attachedFiles.length > 0 && (
                <div className="grid gap-4 grid-cols-5 p-4 justify-start max-w-fit">
                    {attachedFiles.map((file, i) => (
                        <div
                            key={i}
                            className="group w-32 h-32 relative aspect-square rounded-xl cursor-pointer"
                        >
                            <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-black/40 group-hover:opacity-100 opacity-0 transition-opacity ease-in-out duration-150">
                                <button
                                    onClick={() => {
                                        setAttachedFiles(attachedFiles.filter((_, ind) => ind !== i));
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
                    ))}
                </div>
            )}

            {/* Message Input */}
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
        </div>
    );
};

export default ChatWindow;