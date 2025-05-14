import axiosClient from "@/interceptors/axiosClient";
import { useEffect, useState } from "react";

export interface LeetCodeUserStats {
    userId: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    acceptanceRate: number;
    streak: number;
    ranking: number;
    updatedAt: string;
}

export function useLeetCodeUserStats() {
    const [stats, setStats] = useState<LeetCodeUserStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/leetcode/userStats`);
                if (response?.data?.data) {
                    setStats(response.data.data);
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch user stats");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}
