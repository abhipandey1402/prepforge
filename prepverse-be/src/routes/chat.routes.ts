import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
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
} from "../controllers/chat.controller.js";

const chatRouter: Router = Router();

chatRouter.route("/").get(verifyJWT, getAllChats);
chatRouter.route("/users").get(verifyJWT, searchAvailableUsers);
chatRouter.route("/c/:receiverId").post(verifyJWT, createOrGetAOneOnOneChat);
chatRouter.route("/group").post(verifyJWT, createAGroupChat);
chatRouter.route("/group/:chatId").get(verifyJWT, getGroupChatDetails);
chatRouter.route("/group/:chatId").patch(verifyJWT, renameGroupChat);
chatRouter.route("/group/:chatId").delete(verifyJWT, deleteGroupChat);
chatRouter.route("/group/:chatId/:participantId").post(verifyJWT, addNewParticipantInGroupChat);
chatRouter.route("/group/:chatId/:participantId").delete(verifyJWT, removeParticipantFromGroupChat);
chatRouter.route("/leave/group/:chatId").delete(verifyJWT, leaveGroupChat);
chatRouter.route("/remove/:chatId").delete(verifyJWT, deleteOneOnOneChat);


export default chatRouter;