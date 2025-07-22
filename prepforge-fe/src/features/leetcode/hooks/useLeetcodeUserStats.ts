import axiosClient from "@/interceptors/axiosClient";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";

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

interface UseLeetCodeUserStatsResult {
    stats: LeetCodeUserStats | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useLeetCodeUserStats(): UseLeetCodeUserStatsResult {
    const [stats, setStats] = useState<LeetCodeUserStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchStats = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort(); // cancel previous fetch if still running
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            setLoading(true);
            setError(null);

            const response = await axiosClient.get("/leetcode/userStats", {
                signal: controller.signal
            });

            if (response?.data?.data) {
                setStats(response.data.data);
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (err: any) {
            if(axios.isCancel(err)){
                return;
            }
            console.error("Fetch stats error:", err);
            setError(err.message || "Failed to fetch user stats");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
        return () => {
            abortControllerRef.current?.abort(); // abort on unmount
        };
    }, [fetchStats]);

    return { stats, loading, error, refetch: fetchStats };
}
