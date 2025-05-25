import mongoose, { PipelineStage } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { emitSocketEvent } from "../sockets/index.js";
import { ChatEventEnum } from "../constants.js";
import { ChatMessage } from "../models/message.model.js";
import { removeLocalFile } from "../utils/Helpers.js";

const { ObjectId } = mongoose.Types;

/**
 * @description Utility function which returns the pipeline stages to structure the chat schema with common lookups
 * @returns {PipelineStage[]}
 */
const chatCommonAggregation = (): PipelineStage[] => {
    return [
        {
            // lookup for the participants present
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "participants",
                as: "participants",
                pipeline: [
                    {
                        $project: {
                            password: 0,
                            refreshToken: 0,
                            forgotPasswordToken: 0,
                            forgotPasswordExpiry: 0,
                            emailVerificationToken: 0,
                            emailVerificationExpiry: 0,
                        },
                    },
                ],
            },
        },
        {
            // lookup for the group chats
            $lookup: {
                from: "chatmessages",
                foreignField: "_id",
                localField: "lastMessage",
                as: "lastMessage",
                pipeline: [
                    {
                        // get details of the sender
                        $lookup: {
                            from: "users",
                            foreignField: "_id",
                            localField: "sender",
                            as: "sender",
                            pipeline: [
                                {
                                    $project: {
                                        username: 1,
                                        avatar: 1,
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
                ],
            },
        },
        {
            $addFields: {
                lastMessage: { $first: "$lastMessage" },
            },
        },
    ];
};


const deleteCascadeChatMessages = async (chatId: string): Promise<void> => {
    // Fetch the messages associated with the chat to remove
    const messages = await ChatMessage.find({
        chat: new mongoose.Types.ObjectId(chatId),
    });

    // Initialize attachments array to hold objects with localPath property
    let attachments: string[] = [];

    // Get the attachments present in the messages, ensuring each has a valid `localPath` value
    attachments = attachments.concat(
        ...messages.map((message) =>
            message.attachments
                .map((attachment) => attachment.localPath)
                .filter((localPath): localPath is string => Boolean(localPath)) // Filter out null/undefined values
        )
    );

    // Loop through attachments and remove the files from local storage
    attachments.forEach((localPath) => {
        if (localPath) {
            removeLocalFile(localPath); // Access the 'localPath' property directly
        }
    });

    // Delete all the messages related to the chat
    await ChatMessage.deleteMany({
        chat: new mongoose.Types.ObjectId(chatId),
    });
};

const searchAvailableUsers = async (userId: string) => {
    const users = await User.aggregate([
        {
            $match: {
                _id: {
                    $ne: new mongoose.Types.ObjectId(userId),
                },
            },
        },
        {
            $project: {
                avatar: 1,
                username: 1,
                email: 1,
            },
        },
    ]);

    if (!users) {
        throw new ApiError(400, "Users not found");
    }

    return users;
}

const createOrGetAOneOnOneChat = async (receiverId: string, userId: string, req: any) => {
    // Validate the receiver
    const receiver = await User.findById(receiverId);
    if (!receiver) {
        throw new ApiError(404, "Receiver does not exist");
    }

    if (receiver._id.toString() === userId.toString()) {
        throw new ApiError(400, "You cannot chat with yourself");
    }

    // Check if a one-on-one chat already exists
    const chat = await Chat.aggregate([
        {
            $match: {
                isGroupChat: false,
                $and: [
                    { participants: { $elemMatch: { $eq: userId } } },
                    { participants: { $elemMatch: { $eq: new mongoose.Types.ObjectId(receiverId) } } },
                ],
            },
        },
        ...chatCommonAggregation(),
    ]);

    if (chat.length) {
        return {
            status: 200,
            data: chat[0],
            message: "Chat retrieved successfully",
        }
    }

    // Create a new one-on-one chat
    const newChatInstance = await Chat.create({
        name: "One on one chat",
        participants: [userId, new mongoose.Types.ObjectId(receiverId)],
        admin: userId,
    });

    const createdChat = await Chat.aggregate([
        { $match: { _id: newChatInstance._id } },
        ...chatCommonAggregation(),
    ]);

    const payload = createdChat[0];

    if (!payload) {
        throw new ApiError(500, "Internal server error");
    }

    // Emit socket events to the participants
    payload?.participants?.forEach((participant: any) => {
        if (participant._id.toString() === userId.toString()) return;
        emitSocketEvent(req, participant._id.toString(), ChatEventEnum.NEW_CHAT_EVENT, payload);
    });

    return {
        status: 201,
        data: payload,
        message: "Chat created successfully",
    };
}

const createAGroupChat = async (name: string, participants: string[], req: any, userId: string) => {
    // Validate participants
    if (participants.includes(userId.toString())) {
        throw new ApiError(400, "Participants array should not contain the group creator");
    }

    const members = [...new Set([...participants, userId.toString()])];

    if (members.length < 3) {
        throw new ApiError(400, "A group chat must have at least 3 members including the creator.");
    }

    // Create a new group chat
    const groupChat = await Chat.create({
        name,
        isGroupChat: true,
        participants: members,
        admin: userId,
    });

    const chat = await Chat.aggregate([
        { $match: { _id: groupChat._id } },
        ...chatCommonAggregation(),
    ]);

    const payload = chat[0];

    if (!payload) {
        throw new ApiError(500, "Internal server error");
    }

    // Emit socket events to the participants
    payload?.participants?.forEach((participant: any) => {
        if (participant._id.toString() === userId.toString()) return;
        emitSocketEvent(req, participant._id.toString(), ChatEventEnum.NEW_CHAT_EVENT, payload);
    });

    return payload;
}

const getGroupChatDetails = async (chatId: string) => {
    const groupChat = await Chat.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(chatId),
                isGroupChat: true,
            },
        },
        ...chatCommonAggregation(),
    ]);

    const chat = groupChat[0];

    if (!chat) {
        throw new ApiError(404, "Group chat does not exist");
    }

    return chat;
}

const renameGroupChat = async (name: string, userId: string, chatId: string, req: any) => {
    const groupChat = await Chat.findOne({
        _id: new mongoose.Types.ObjectId(chatId),
        isGroupChat: true,
    });

    if (!groupChat) {
        throw new ApiError(404, "Group chat does not exist");
    }

    if (groupChat.admin?.toString() !== userId.toString()) {
        throw new ApiError(404, "You are not an admin");
    }

    const updatedGroupChat = await Chat.findByIdAndUpdate(
        chatId,
        { $set: { name } },
        { new: true }
    );

    const chat = await Chat.aggregate([
        { $match: { _id: updatedGroupChat!._id } },
        ...chatCommonAggregation(),
    ]);

    const payload = chat[0];

    if (!payload) {
        throw new ApiError(500, "Internal server error");
    }

    payload?.participants?.forEach((participant: any) => {
        emitSocketEvent(
            req,
            participant._id?.toString(),
            ChatEventEnum.UPDATE_GROUP_NAME_EVENT,
            payload
        );
    });

    return chat[0];
}

const deleteGroupChat = async (userId: string, chatId: string, req: any) => {
    const groupChat = await Chat.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(chatId), isGroupChat: true } },
        ...chatCommonAggregation(),
    ]);

    const chat = groupChat[0];

    if (!chat) {
        throw new ApiError(404, "Group chat does not exist");
    }

    if (chat.admin?.toString() !== userId.toString()) {
        throw new ApiError(404, "Only admin can delete the group");
    }

    await Chat.findByIdAndDelete(chatId);
    await deleteCascadeChatMessages(chatId);

    chat?.participants?.forEach((participant: any) => {
        if (participant._id.toString() === req.user?._id) return;
        emitSocketEvent(
            req,
            participant._id?.toString(),
            ChatEventEnum.LEAVE_CHAT_EVENT,
            chat
        );
    });
}

const deleteOneOnOneChat = async (userId: string, chatId: string, req: any) => {
    const chat = await Chat.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(chatId) } },
        ...chatCommonAggregation(),
    ]);

    const payload = chat[0];

    if (!payload) {
        throw new ApiError(404, "Chat does not exist");
    }

    await Chat.findByIdAndDelete(chatId);
    await deleteCascadeChatMessages(chatId);

    const otherParticipant = payload?.participants?.find(
        (participant: any) => participant._id.toString() !== userId.toString()
    );

    emitSocketEvent(
        req,
        otherParticipant?._id?.toString(),
        ChatEventEnum.LEAVE_CHAT_EVENT,
        payload
    );
}

const leaveGroupChat = async (userId: string, chatId: string, req: any) => {
    const groupChat = await Chat.findOne({
        _id: new mongoose.Types.ObjectId(chatId),
        isGroupChat: true,
    });

    if (!groupChat) {
        throw new ApiError(404, "Group chat does not exist");
    }

    const existingParticipants = groupChat.participants;

    if (!existingParticipants?.includes(new ObjectId(userId))) {
        throw new ApiError(400, "You are not a part of this group chat");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { participants: userId } },
        { new: true }
    );

    const chat = await Chat.aggregate([
        { $match: { _id: updatedChat!._id } },
        ...chatCommonAggregation(),
    ]);

    const payload = chat[0];

    if (!payload) {
        throw new ApiError(500, "Internal server error");
    }

    return payload;
}

const addNewParticipantInGroupChat = async (userId: string, chatId: string, participantId: string, req: any) => {
    // Check if chat is a group
    const groupChat = await Chat.findOne({
        _id: new mongoose.Types.ObjectId(chatId),
        isGroupChat: true,
    });

    if (!groupChat) {
        throw new ApiError(404, "Group chat does not exist");
    }

    // Check if user who is adding is a group admin
    if (groupChat.admin?.toString() !== userId?.toString()) {
        throw new ApiError(404, "You are not an admin");
    }

    const existingParticipants = groupChat.participants;

    // Check if the participant being added is already part of the group
    if (existingParticipants?.includes(new ObjectId(participantId))) {
        throw new ApiError(409, "Participant already in a group chat");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { participants: participantId }, // Add new participant ID
        },
        { new: true }
    );

    const chat = await Chat.aggregate([
        { $match: { _id: updatedChat!._id } },
        ...chatCommonAggregation(),
    ]);

    const payload = chat[0];

    if (!payload) {
        throw new ApiError(500, "Internal server error");
    }

    // Emit new chat event to the added participant
    emitSocketEvent(req, participantId, ChatEventEnum.NEW_CHAT_EVENT, payload);

    return payload;
}

const removeParticipantFromGroupChat = async (userId: string, chatId: string, participantId: string, req: any) => {
    // Check if chat is a group
    const groupChat = await Chat.findOne({
        _id: new mongoose.Types.ObjectId(chatId),
        isGroupChat: true,
    });

    if (!groupChat) {
        throw new ApiError(404, "Group chat does not exist");
    }

    // Check if user who is deleting is a group admin
    if (groupChat.admin?.toString() !== userId?.toString()) {
        throw new ApiError(404, "You are not an admin");
    }

    const existingParticipants = groupChat.participants;

    // Check if the participant being removed is part of the group
    if (!existingParticipants?.includes(new ObjectId(participantId))) {
        throw new ApiError(400, "Participant does not exist in the group chat");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { participants: participantId }, // Remove participant ID
        },
        { new: true }
    );

    const chat = await Chat.aggregate([
        { $match: { _id: updatedChat!._id } },
        ...chatCommonAggregation(),
    ]);

    const payload = chat[0];

    if (!payload) {
        throw new ApiError(500, "Internal server error");
    }

    // Emit leave chat event to the removed participant
    emitSocketEvent(req, participantId, ChatEventEnum.LEAVE_CHAT_EVENT, payload);

    return payload;
}

const getAllChats = async (userId: string) => {
    const chats = await Chat.aggregate([
        {
            $match: {
                participants: { $elemMatch: { $eq: userId } }, // Get all chats that have logged in user as a participant
            },
        },
        {
            $sort: { updatedAt: -1 },
        },
        ...chatCommonAggregation(),
    ]);
    return chats;
}

export {
    searchAvailableUsers,
    createOrGetAOneOnOneChat,
    createAGroupChat,
    getGroupChatDetails,
    renameGroupChat,
    deleteGroupChat,
    deleteOneOnOneChat,
    leaveGroupChat,
    addNewParticipantInGroupChat,
    removeParticipantFromGroupChat,
    getAllChats,
};