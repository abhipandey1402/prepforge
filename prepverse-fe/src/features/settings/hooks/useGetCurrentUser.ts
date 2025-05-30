import axiosClient from "@/interceptors/axiosClient";
import { useCallback, useEffect, useState } from "react";
import { User } from "../types/settings.types";

export function useGetCurrentUser() {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCurrentUser = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get(`/users/currentuser`);
            if (response?.data?.data?.user) {
                setUser(response.data.data.user);
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch current user");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    return { user, loading, error, refetch: fetchCurrentUser };
}