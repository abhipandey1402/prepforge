import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useGetGroupInfo = () => {
    const [loading, setLoading] = useState(false);

    const getGroupInfo = async (chatId: string) => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/chats/group/${chatId}`);
            return response?.data?.data;
        } catch (error) {
            console.error("Error fetching group info:", error);
            toast.error("Failed to fetch group info");
        } finally {
            setLoading(false);
        }
    };

    return { getGroupInfo, loading };
};
