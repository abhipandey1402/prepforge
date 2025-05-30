import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useRemoveParticipantFromGroup = () => {
    const [loading, setLoading] = useState(false);

    const removeParticipantFromGroup = async (chatId: string, participantId: string) => {
        setLoading(true);
        try {
            await axiosClient.delete(`/chats/group/${chatId}/${participantId}`);
            toast.success("Participant removed successfully");
        } catch (error) {
            console.error("Error removing participant:", error);
            toast.error("Failed to remove participant");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { removeParticipantFromGroup, loading };
};
