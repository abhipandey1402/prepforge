import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useDeleteMessage = () => {
    const [loading, setLoading] = useState(false);

    const deleteMessage = async (chatId: string, messageId: string) => {
        setLoading(true);
        try {
            const response = await axiosClient.delete(`/messages/${chatId}/${messageId}`);
            toast.success("Message deleted successfully");
            return response?.data;
        } catch (error) {
            console.error("Error deleting message:", error);
            toast.error("Failed to delete message");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { deleteMessage, loading };
};
