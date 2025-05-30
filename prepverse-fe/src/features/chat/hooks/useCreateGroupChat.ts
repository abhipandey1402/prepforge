import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCreateGroupChat = () => {
    const [loading, setLoading] = useState(false);

    const createGroupChat = async (data: { name: string; participants: string[] }) => {
        setLoading(true);
        try {
            const response = await axiosClient.post(`/chats/group`, data);
            toast.success("Group chat created successfully");
            return response.data;
        } catch (error) {
            console.error("Error creating group chat:", error);
            toast.error("Failed to create group chat");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { createGroupChat, loading };
};
