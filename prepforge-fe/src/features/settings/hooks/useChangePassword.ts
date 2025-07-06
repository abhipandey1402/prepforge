import { useState } from "react";
import axiosClient from "@/interceptors/axiosClient";

interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}

interface ChangePasswordResult {
    changePassword: (payload: ChangePasswordPayload) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export function useChangePassword(): ChangePasswordResult {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const changePassword = async (payload: ChangePasswordPayload) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosClient.post("/users/changePassword", payload);

            if (response?.data?.success) {

            } else {
                throw new Error(response?.data?.message || "Unexpected error");
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || "Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading, error };
}
