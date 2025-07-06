import mongoose from "mongoose";
import { Chat } from "../models/chat.model.js";
import { ChatMessage } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getLocalPath, getStaticFilePath, removeLocalFile } from "../utils/Helpers.js";
import { emitSocketEvent } from "../sockets/index.js";
import { ChatEventEnum } from "../constants.js";
const { ObjectId } = mongoose.Types;


interface Attachment {
    url?: string | null;
    localPath?: string | null;
}

const chatMessageCommonAggregation = () => {
    return [
        {
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "sender",
                as: "sender",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            avatarUrl: 1,
                            email: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                sender: { $first: "$sender" },
            },
        },
    ];
};

const getAllMessages = async (userId: string, chatId: string) => {
    const selectedChat = await Chat.findById(chatId);

    if (!selectedChat) {
        throw new ApiError(404, "Chat does not exist");
    }

    if (!selectedChat.participants?.includes(new ObjectId(userId))) {
        throw new ApiError(400, "User is not a part of this chat");
    }

    const messages = await ChatMessage.aggregate([
        {
            $match: {
                chat: new mongoose.Types.ObjectId(chatId),
            },
        },
        ...chatMessageCommonAggregation(),
        {
            $sort: {
                createdAt: -1,
            },
        },
    ]);

    return messages;
}

const sendMessage = async (userId: string, chatId: string, content: any, req: any) => {
    if (!content && !req.files?.attachments?.length) {
        throw new ApiError(400, "Message content or attachment is required");
    }

    const selectedChat = await Chat.findById(chatId);

    if (!selectedChat) {
        throw new ApiError(404, "Chat does not exist");
    }

    const messageFiles: Attachment[] = [];

    if (req.files && req.files.attachments?.length > 0) {
        req.files.attachments?.map((attachment: any) => {
            messageFiles.push({
                url: getStaticFilePath(req, attachment.filename),
                localPath: getLocalPath(attachment.filename),
            });
        });
    }

    const message = await ChatMessage.create({
        sender: new mongoose.Types.ObjectId(userId),
        content: content || "",
        chat: new mongoose.Types.ObjectId(chatId),
        attachments: messageFiles,
    });

    const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $set: {
                lastMessage: message._id,
            },
        },
        { new: true }
    );

    const messages = await ChatMessage.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(message._id),
            },
        },
        ...chatMessageCommonAggregation(),
    ]);

    const receivedMessage = messages[0];

    if (!receivedMessage) {
        throw new ApiError(500, "Internal server error");
    }

    if (chat?.participants && Array.isArray(chat?.participants)) {
        chat.participants.forEach((participantObjectId) => {
            if (participantObjectId.toString() === userId.toString()) return;

            emitSocketEvent(
                req,
                participantObjectId.toString(),
                ChatEventEnum.MESSAGE_RECEIVED_EVENT,
                receivedMessage
            );
        });
    } else {
        // Optionally handle the case where participants are not available
        throw new ApiError(400, "No participants found for this chat");
    }

    return receivedMessage;
}

const deleteMessage = async (userId: string, chatId: string, messageId: string, req: any) => {
    const chat = await Chat.findOne({
        _id: new mongoose.Types.ObjectId(chatId),
        participants: userId,
    });

    if (!chat) {
        throw new ApiError(404, "Chat does not exist");
    }

    const message = await ChatMessage.findOne({
        _id: new mongoose.Types.ObjectId(messageId),
    });

    if (!message) {
        throw new ApiError(404, "Message does not exist");
    }

    if (!message.sender || message.sender.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this message");
    }

    if (message.attachments.length > 0) {
        message.attachments.forEach((asset: Attachment) => {
            if (asset.localPath) {
                removeLocalFile(asset.localPath);
            }
        });
    }

    await ChatMessage.deleteOne({
        _id: new mongoose.Types.ObjectId(messageId),
    });

    if (chat.lastMessage && chat.lastMessage.toString() === message._id.toString()) {
        const lastMessage = await ChatMessage.findOne(
            { chat: chatId },
            {},
            { sort: { createdAt: -1 } }
        );

        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: lastMessage ? lastMessage?._id : null,
        });
    }

    chat.participants.forEach((participantObjectId) => {
        if (participantObjectId.toString() === userId.toString()) return;

        emitSocketEvent(
            req,
            participantObjectId.toString(),
            ChatEventEnum.MESSAGE_DELETE_EVENT,
            message
        );
    });

    return message;
}

export {
    getAllMessages,
    sendMessage,
    deleteMessage,
}