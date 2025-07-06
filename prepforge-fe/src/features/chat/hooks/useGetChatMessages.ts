import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useGetChatMessages = () => {
    const [loading, setLoading] = useState(false);

    const getChatMessages = async (chatId: string) => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/messages/${chatId}`);
            return response?.data?.data;
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to fetch messages");
        } finally {
            setLoading(false);
        }
    };

    return { getChatMessages, loading };
};
