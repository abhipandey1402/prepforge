import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import * as chatService from "../services/chat.service.js"


const searchAvailableUsers = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user._id;

    const availableUsers = await chatService.searchAvailableUsers(userId);

    res.status(200).json(
        new ApiResponse(200, availableUsers, "Users fetched successfully")
    );
});

const createOrGetAOneOnOneChat = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { receiverId } = req.params;
    const userId = req.user._id;

    const { status, data, message } = await chatService.createOrGetAOneOnOneChat(receiverId, userId, req);

    res.status(status).json(new ApiResponse(status, data, message));
});

const createAGroupChat = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { name, participants } = req.body;
    const userId = req.user._id;

    const groupChatRes = await chatService.createAGroupChat(name, participants, req, userId);

    res.status(201).json(new ApiResponse(201, groupChatRes, "Group chat created successfully"));
});

const getGroupChatDetails = asyncHandler(async (req: any, res: any): Promise<Response> => {
    const { chatId } = req.params;

    const groupChatDetail = await chatService.getGroupChatDetails(chatId);

    return res
        .status(200)
        .json(new ApiResponse(200, groupChatDetail, "Group chat fetched successfully"));
});

const renameGroupChat = asyncHandler(async (req: any, res: any): Promise<Response> => {
    const { chatId } = req.params;
    const userId = req.user._id;
    const { name }: { name: string } = req.body;

    const groupChatRes = await chatService.renameGroupChat(name, userId, chatId, req);

    return res
        .status(200)
        .json(new ApiResponse(200, groupChatRes, "Group chat name updated successfully"));
});

const deleteGroupChat = asyncHandler(async (req: any, res: any): Promise<Response> => {
    const { chatId } = req.params;
    const userId = req.user._id;

    await chatService.deleteGroupChat(userId, chatId, req);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Group chat deleted successfully"));
});

const deleteOneOnOneChat = asyncHandler(async (req: any, res: any): Promise<Response> => {
    const { chatId } = req.params;
    const userId = req.user._id;

    await chatService.deleteOneOnOneChat(userId, chatId, req);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Chat deleted successfully"));
});

const leaveGroupChat = asyncHandler(async (req: any, res: any): Promise<Response> => {
    const { chatId } = req.params;
    const userId = req.user._id;

    const groupRes = await chatService.leaveGroupChat(userId, chatId, req);

    return res
        .status(200)
        .json(new ApiResponse(200, groupRes, "Left a group successfully"));
});

const addNewParticipantInGroupChat = asyncHandler(async (req: any, res: any): Promise<Response> => {
    const { chatId, participantId } = req.params;
    const userId = req.user._id;

    const participantGroupRes = await chatService.addNewParticipantInGroupChat(userId, chatId, participantId, req);

    return res
        .status(200)
        .json(new ApiResponse(200, participantGroupRes, "Participant added successfully"));
});

const removeParticipantFromGroupChat = asyncHandler(async (req: any, res: any): Promise<Response> => {
    const { chatId, participantId } = req.params;
    const userId = req.user._id;

    const removedParticipantRes = await chatService.removeParticipantFromGroupChat(userId, chatId, participantId, req);

    return res
        .status(200)
        .json(new ApiResponse(200, removedParticipantRes, "Participant removed successfully"));
});

const getAllChats = asyncHandler(async (req: any, res: any): Promise<Response> => {
    const userId = req.user._id;

    const chats = await chatService.getAllChats(userId);

    return res
        .status(200)
        .json(
            new ApiResponse(200, chats || [], "User chats fetched successfully!")
        );
});

export {
    addNewParticipantInGroupChat,
    createAGroupChat,
    createOrGetAOneOnOneChat,
    deleteGroupChat,
    deleteOneOnOneChat,
    getAllChats,
    getGroupChatDetails,
    leaveGroupChat,
    removeParticipantFromGroupChat,
    renameGroupChat,
    searchAvailableUsers,
};
