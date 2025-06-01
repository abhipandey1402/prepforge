import axiosClient from "@/interceptors/axiosClient";
import { useEffect, useState, useCallback, useRef } from "react";

export interface LeetCodeSubmission {
    _id: string;
    userId: string;
    submissionId: number;
    questionId: number;
    frontendId: number;
    title: string;
    titleSlug: string;
    url: string;
    lang: string;
    langName: string;
    status: number;
    statusDisplay: string;
    isPending: string;
    runtime: string;
    memory: string;
    code: string;
    compareResult: string;
    timeAgo: string;
    timestamp: number;
    hasNotes: boolean;
    flagType: number;
    __v: number;
    createdAt: string;
    updatedAt: string;
}

interface UseLeetCodeSubmissionsOptions {
    page?: number;
    size?: number;
    setTotal?: (total: number) => void;
}

interface UseLeetCodeSubmissionsResult {
    submissions: LeetCodeSubmission[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useLeetCodeSubmissions(options: UseLeetCodeSubmissionsOptions = {}): UseLeetCodeSubmissionsResult {
    const {
        page = 1,
        size = 10,
        setTotal
    } = options;

    const [submissions, setSubmissions] = useState<LeetCodeSubmission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchSubmissions = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            setLoading(true);
            setError(null);

            const response = await axiosClient.get(
                `/leetcode/submissions?page=${page}&limit=${size}`,
                { signal: controller.signal }
            );

            if (response?.data?.data) {
                setSubmissions(response.data.data.submissions || []);
                if (setTotal && typeof response.data.data.totalSubmissions === "number") {
                    setTotal(response.data.data.totalSubmissions);
                }
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (err: any) {
            if (err.name !== "AbortError") {
                console.error("Fetch submissions error:", err);
                setError(err.message || "Failed to fetch submissions");
            }
        } finally {
            setLoading(false);
        }
    }, [page, size, setTotal]);

    useEffect(() => {
        fetchSubmissions();
        return () => {
            abortControllerRef.current?.abort();
        };
    }, [fetchSubmissions]);

    return {
        submissions,
        loading,
        error,
        refetch: fetchSubmissions,
    };
}
