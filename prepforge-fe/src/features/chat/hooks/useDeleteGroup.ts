import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useDeleteGroup = () => {
    const [loading, setLoading] = useState(false);

    const deleteGroup = async (chatId: string) => {
        setLoading(true);
        try {
            await axiosClient.delete(`/chats/group/${chatId}`);
            toast.success("Group deleted successfully");
        } catch (error) {
            console.error("Error deleting group:", error);
            toast.error("Failed to delete group");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { deleteGroup, loading };
};
