import { useState } from "react";
import axiosClient from "@/interceptors/axiosClient";

export function useUpdateUserData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUser = async (data: { username?: string; fullName?: string }) => {
        setLoading(true);
        setError(null);

        try {
            await axiosClient.patch("/users/updateData", data);
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to update user data";
            setError(message);
            throw new Error(message); // ✅ re-throw error for external handling
        } finally {
            setLoading(false);
        }
    };

    return { updateUser, loading, error };
}
