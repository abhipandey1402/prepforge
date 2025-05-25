import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import * as messageService from "../services/message.service.js";

const getAllMessages = asyncHandler(async (req: any, res: any) => {
    const { chatId } = req.params;
    const userId = req.user._id;

    const messages = await messageService.getAllMessages(userId, chatId);

    return res
        .status(200)
        .json(new ApiResponse(200, messages || [], "Messages fetched successfully"));
});

const sendMessage = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { chatId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const receivedMessage = await messageService.sendMessage(userId, chatId, content, req);

    return res
        .status(201)
        .json(new ApiResponse(201, receivedMessage, "Message saved successfully"));
});

const deleteMessage = asyncHandler(async (req: any, res: any) => {
    const { chatId, messageId } = req.params;
    const userId = req.user._id;

    const deletedMessageRes = await messageService.deleteMessage(userId, chatId, messageId, req);

    return res
        .status(200)
        .json(new ApiResponse(200, deletedMessageRes, "Message deleted successfully"));
});

export { getAllMessages, sendMessage, deleteMessage };
