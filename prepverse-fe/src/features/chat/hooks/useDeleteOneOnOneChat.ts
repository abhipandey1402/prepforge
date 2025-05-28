import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useDeleteOneOnOneChat = () => {
    const [loading, setLoading] = useState(false);

    const deleteOneOnOneChat = async (chatId: string) => {
        setLoading(true);
        try {
            await axiosClient.delete(`/chats/remove/${chatId}`);
            toast.success("Chat deleted successfully");
        } catch (error) {
            console.error("Error deleting chat:", error);
            toast.error("Failed to delete chat");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { deleteOneOnOneChat, loading };
};
