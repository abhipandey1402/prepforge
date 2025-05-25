import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    deleteMessage,
    getAllMessages,
    sendMessage,
} from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const messageRouter: Router = Router();

messageRouter.route("/:chatId").get(verifyJWT, getAllMessages);
messageRouter.route("/:chatId").post(verifyJWT, upload.fields([{name: "attachments", maxCount: 5}]) ,   sendMessage);
messageRouter.route("/:chatId/:messageId").delete(verifyJWT, deleteMessage);


export default messageRouter;