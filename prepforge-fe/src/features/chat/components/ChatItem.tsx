import {
    EllipsisVerticalIcon,
    PaperclipIcon,
    TrashIcon,
} from "lucide-react";
import { InfoIcon } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { classNames, getChatObjectMetadata } from "../utils/index";
import GroupChatDetailsModal from "./GroupChatDetailsModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDeleteOneOnOneChat } from "../hooks/useDeleteOneOnOneChat";
import { toast } from "react-toastify";

const ChatItem: React.FC<{
    chat: any;
    onClick: (chat: any) => void;
    isActive?: boolean;
    unreadCount?: number;
    onChatDelete: (chatId: string) => void;
    isDarkMode?: boolean;
}> = ({ chat, onClick, isActive, unreadCount = 0, onChatDelete, isDarkMode }) => {
    const user = useSelector((state: RootState) => state.auth?.userData?.user);
    const [openOptions, setOpenOptions] = useState(false);
    const [openGroupInfo, setOpenGroupInfo] = useState(false);
    const { deleteOneOnOneChat } = useDeleteOneOnOneChat();

    const deleteChat = async () => {
        try {
            await deleteOneOnOneChat(chat?._id);
            onChatDelete(chat?._id);
        } catch (err: any) {
            toast.error("Error occured", err);
        }
    };

    if (!chat) {
        return;
    }

    return (
        <>
            <GroupChatDetailsModal
                open={openGroupInfo}
                onClose={() => {
                    setOpenGroupInfo(false);
                }}
                chatId={chat._id}
                onGroupDelete={onChatDelete}
            />
            <div
                role="button"
                onClick={() => onClick(chat)}
                onMouseLeave={() => setOpenOptions(false)}
                className={classNames(
                    "group p-3 my-2 flex justify-between gap-2 items-start cursor-pointer rounded-xl border-[1px] border-zinc-200",
                    isActive && isDarkMode ?  "border-[1px] border-zinc-500 bg-secondary" : "",
                    unreadCount > 0
                        ? "border-[1px] border-success bg-success/20 font-bold"
                        : "",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                )}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenOptions(!openOptions);
                    }}
                    className="self-center p-0 relative"
                >
                    <EllipsisVerticalIcon className="h-6 group-hover:w-6 group-hover:opacity-100 w-0 opacity-0 transition-all ease-in-out duration-100 text-zinc-300" />
                    <div
                        className={classNames(
                            "z-20 text-left absolute bottom-0 translate-y-full text-sm w-52 bg-dark rounded-2xl p-2 shadow-md border-[1px] border-secondary",
                            openOptions ? "block" : "hidden"
                        )}
                    >
                        {chat.isGroupChat ? (
                            <p
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenGroupInfo(true);
                                }}
                                role="button"
                                className="p-4 w-full rounded-lg inline-flex items-center hover:bg-secondary"
                            >
                                <InfoIcon className="h-4 w-4 mr-2" /> About group
                            </p>
                        ) : (
                            <p
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const ok = confirm(
                                        "Are you sure you want to delete this chat?"
                                    );
                                    if (ok) {
                                        deleteChat();
                                    }
                                }}
                                role="button"
                                className="p-2 text-danger rounded-lg w-full inline-flex items-center hover:bg-secondary"
                            >
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Delete chat
                            </p>
                        )}
                    </div>
                </button>
                <div className="flex justify-center items-center flex-shrink-0">
                    {chat.isGroupChat ? (
                        <div className="w-12 relative h-12 flex-shrink-0 flex justify-start items-center flex-nowrap">
                            {chat.participants.slice(0, 3).map((participant: any, i: any) => {
                                return (
                                    <img
                                        key={participant._id}
                                        src={participant?.avatarUrl}
                                        className={classNames(
                                            "w-8 h-8 border-[1px] border-white rounded-full absolute outline-4 outline-dark group-hover:outline-secondary",
                                            i === 0
                                                ? "left-0 z-[3]"
                                                : i === 1
                                                    ? "left-2.5 z-[2]"
                                                    : i === 2
                                                        ? "left-[18px] z-[1]"
                                                        : ""
                                        )}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <img
                            src={getChatObjectMetadata(chat, user!)?.avatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                    )}
                </div>
                <div className="w-full">
                    <p className="text-orange-500 truncate-1">
                        {getChatObjectMetadata(chat, user!)?.title}
                    </p>
                    <div className="w-full inline-flex items-center text-left">
                        {chat.lastMessage && chat.lastMessage.attachments.length > 0 ? (
                            // If last message is an attachment show paperclip
                            <PaperclipIcon className="text-orange-400 h-3 w-3 mr-2 flex flex-shrink-0" />
                        ) : null}
                        <small className="text-orange-400 truncate-1 text-sm text-ellipsis inline-flex items-center">
                            {getChatObjectMetadata(chat, user!)?.lastMessage?.slice(0, 20)}
                        </small>
                    </div>
                </div>
                <div className="flex text-orange-400 h-full text-sm flex-col justify-between items-end">
                    <small className="mb-2 inline-flex flex-shrink-0 w-max">
                        {moment(chat.updatedAt).add("TIME_ZONE", "hours").fromNow(true)}
                    </small>

                    {/* Unread count will be > 0 when user is on another chat and there is new message in a chat which is not currently active on user's screen */}
                    {unreadCount <= 0 ? null : (
                        <span className="bg-success h-2 w-2 aspect-square flex-shrink-0 p-2 text-white text-xs rounded-full inline-flex justify-center items-center">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatItem;
