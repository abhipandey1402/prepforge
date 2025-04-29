import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Server, Socket } from "socket.io";
import { AvailableChatEvents, ChatEventEnum } from "../constants.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * @description This function allows a user to join the chat represented by chatId. Triggered when a user switches between chats.
 * @param socket The socket instance.
 */
const mountJoinChatEvent = (socket: Socket): void => {
    socket.on(ChatEventEnum.JOIN_CHAT_EVENT, (chatId: string) => {
        console.log(`User joined the chat 🤝. chatId: `, chatId);
        socket.join(chatId);
    });
};

/**
 * @description Emits the typing event to other participants of the chat.
 * @param socket The socket instance.
 */
const mountParticipantTypingEvent = (socket: Socket): void => {
    socket.on(ChatEventEnum.TYPING_EVENT, (chatId: string) => {
        console.log(`User typing in the chat, chatId: `, chatId);
        socket.in(chatId).emit(ChatEventEnum.TYPING_EVENT, chatId);
    });
};

/**
 * @description Emits the stopped typing event to other participants of the chat.
 * @param socket The socket instance.
 */
const mountParticipantStoppedTypingEvent = (socket: Socket): void => {
    socket.on(ChatEventEnum.STOP_TYPING_EVENT, (chatId: string) => {
        socket.in(chatId).emit(ChatEventEnum.STOP_TYPING_EVENT, chatId);
    });
};

/**
 * @description Initializes the Socket.IO server and manages connections and events.
 * @param io The Socket.IO server instance.
 */
const initializeSocketIO = (io: Server): any => {
    return io.on("connection", async (socket: Socket) => {
        try {
            const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
            let token = cookies?.accessToken || socket.handshake.auth?.token;

            if (!token) {
                throw new ApiError(401, "Unauthorized handshake. Token is missing.");
            }

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string };
            const user = await User.findById(decodedToken?.id).select(
                "-password"
            );

            if (!user) {
                throw new ApiError(401, "Unauthorized handshake. Token is invalid.");
            }

            (socket as any).user = user; // Attach the user to the socket object.

            socket.join(user._id.toString());
            socket.emit(ChatEventEnum.CONNECTED_EVENT);
            console.log("User connected 🗼. userId: ", user._id.toString());

            mountJoinChatEvent(socket);
            mountParticipantTypingEvent(socket);
            mountParticipantStoppedTypingEvent(socket);

            socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
                console.log("User has disconnected 🚫. userId: ", (socket as any).user?._id);
                if ((socket as any).user?._id) {
                    socket.leave((socket as any).user._id);
                }
            });
        } catch (error: any) {
            console.log("Global error", error);
            socket.emit(
                ChatEventEnum.SOCKET_ERROR_EVENT,
                error?.message || "Something went wrong while connecting to the socket."
            );
        }
    });
};

/**
 * @description Utility function to emit socket events via the `io` instance.
 * @param req The Express request object to access the `io` instance.
 * @param roomId The room where the event should be emitted.
 * @param event The event to be emitted.
 * @param payload The data to send with the event.
 */
const emitSocketEvent = (
    req: import("express").Request,
    roomId: string,
    event: typeof AvailableChatEvents[number],
    payload: any
): void => {
    req.app.get("io").in(roomId).emit(event, payload);
};

export { initializeSocketIO, emitSocketEvent };
