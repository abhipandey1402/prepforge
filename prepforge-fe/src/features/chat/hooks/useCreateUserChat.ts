import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCreateUserChat = () => {
    const [loading, setLoading] = useState(false);

    const createUserChat = async (receiverId: string) => {
        setLoading(true);
        try {
            const response = await axiosClient.post(`/chats/c/${receiverId}`);
            toast.success("Chat created successfully");
            return response.data;
        } catch (error) {
            console.error("Error creating chat:", error);
            toast.error("Failed to create chat");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { createUserChat, loading };
};
