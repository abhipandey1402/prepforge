import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useAddParticipantToGroup = () => {
    const [loading, setLoading] = useState(false);

    const addParticipantToGroup = async (chatId: string, participantId: string) => {
        setLoading(true);
        try {
            const response = await axiosClient.post(`/chats/group/${chatId}/${participantId}`);
            toast.success("Participant added successfully");
            return response.data;
        } catch (error) {
            console.error("Error adding participant:", error);
            toast.error("Failed to add participant");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { addParticipantToGroup, loading };
};
