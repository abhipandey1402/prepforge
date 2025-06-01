import { useSocket } from "@/features/chat/utils/SocketContext";
import { useEffect, useState } from "react";


export const useLeetCodeSync = () => {
    const [progress, setProgress] = useState({ progress: 0, message: "Starting...", userId: "" });
    const [status, setStatus] = useState("pending");
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) {
            console.error("Socket not found in settings");
            return;
        }

        socket.on("sync-progress", (update) => {
            console.log(update);
            setProgress(update);
        });

        socket.on("sync-status", (update) => {
            console.log(update);
            setStatus(update?.status);
        });

        return () => {
            socket.off("sync-progress");
            socket.off("sync-status");
        };
    }, [socket]);

    return { progress, status };
};