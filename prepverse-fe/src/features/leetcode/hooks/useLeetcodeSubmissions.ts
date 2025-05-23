import axiosClient from "@/interceptors/axiosClient";
import { useEffect, useState } from "react";

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

export function useLeetCodeSubmissions(page: number = 1, size: number = 10, setTotal: any) {
    const [submissions, setSubmissions] = useState<LeetCodeSubmission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/leetcode/submissions?page=${page}&limit=${size}`);
                if (response) {
                    setSubmissions(response?.data?.data?.submissions);
                    setTotal(response?.data?.data?.totalSubmissions);
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch submissions");
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [page, size]);

    return { submissions, loading, error };
}
