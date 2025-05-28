import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useGetAvailableUsers = () => {
    const [loading, setLoading] = useState(false);

    const getAvailableUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/chats/users");
            return response?.data?.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    return { getAvailableUsers, loading };
};
