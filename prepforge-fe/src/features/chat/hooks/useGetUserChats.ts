import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useGetUserChats = () => {
    const [loading, setLoading] = useState(false);

    const getUserChats = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/chats`);
            return response.data?.data;
        } catch (error) {
            console.error("Error fetching chats:", error);
            toast.error("Failed to fetch chats");
        } finally {
            setLoading(false);
        }
    };

    return { getUserChats, loading };
};
