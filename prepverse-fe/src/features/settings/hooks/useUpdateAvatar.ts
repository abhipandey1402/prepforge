import { useState } from "react";
import axiosClient from "@/interceptors/axiosClient";

export function useUpdateAvatar() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateAvatar = async (file: File): Promise<string> => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("avatar", file);

            const res = await axiosClient.patch("/users/updateAvatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return res.data.data.avatarUrl as string;
        } catch (err: any) {
            const message =
                err.response?.data?.message || "Failed to update avatar";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { updateAvatar, loading, error };
}
