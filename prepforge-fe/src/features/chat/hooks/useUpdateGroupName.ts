import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useUpdateGroupName = () => {
    const [loading, setLoading] = useState(false);

    const updateGroupName = async (chatId: string, name: string) => {
        setLoading(true);
        try {
            const response = await axiosClient.patch(`/chats/group/${chatId}`, { name });
            toast.success("Group name updated successfully");
            return response.data;
        } catch (error) {
            console.error("Error updating group name:", error);
            toast.error("Failed to update group name");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { updateGroupName, loading };
};
