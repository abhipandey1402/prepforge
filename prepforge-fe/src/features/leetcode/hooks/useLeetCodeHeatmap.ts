import axiosClient from "@/interceptors/axiosClient";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";

interface LeetCodeHeatmapData {
    submissionCalendar: string; // JSON string containing timestamp: count pairs
}

interface UseLeetCodeHeatmapResult {
    heatmapData: LeetCodeHeatmapData | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useLeetCodeHeatmap(): UseLeetCodeHeatmapResult {
    const [heatmapData, setHeatmapData] = useState<LeetCodeHeatmapData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchHeatmapData = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            setLoading(true);
            setError(null);

            const response = await axiosClient.get('/leetcode/heatmap', {
                signal: controller.signal
            });

            if (response?.data) {
                setHeatmapData(response?.data?.data);
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (err: any) {
            if(axios.isCancel(err)){
                return;
            }
            if (err.name !== "AbortError") {
                console.error("Fetch heatmap error:", err);
                setError(err.message || "Failed to fetch heatmap data");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHeatmapData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, [fetchHeatmapData]);

    return {
        heatmapData,
        loading,
        error,
        refetch: fetchHeatmapData,
    };
}