import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useSendMessage = () => {
    const [loading, setLoading] = useState(false);

    const sendMessage = async (chatId: string, content: string, attachments: File[]) => {
        const formData = new FormData();
        if (content) formData.append("content", content);
        attachments?.forEach((file) => formData.append("attachments", file));

        setLoading(true);
        try {
            const response = await axiosClient.post(`/messages/${chatId}`, formData);
            toast.success("Message sent successfully");
            return response.data;
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};
