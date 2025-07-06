import axiosClient from "@/interceptors/axiosClient";
import { useEffect, useState, useCallback, useRef } from "react";

export interface LeetCodeProblem {
    _id: string;
    id: string;
    questionFrontendId: string;
    title: string;
    titleSlug: string;
    difficulty: string;
    topicTags: string[];
    paidOnly: boolean;
    status: string;
    acRate: number;
    __v: number;
    questionFrontendIdInt: number;
}

interface Filters {
    difficulty?: string;
    tags?: string[];
    status?: string;
    [key: string]: any;
}

interface UseLeetCodeProblemsOptions {
    page?: number;
    size?: number;
    searchQuery?: string;
    setTotal?: (total: number) => void;
    filters?: Filters;
    sort?: Record<string, any>;
}

interface UseLeetCodeProblemsResult {
    problems: LeetCodeProblem[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useLeetCodeProblems(options: UseLeetCodeProblemsOptions = {}): UseLeetCodeProblemsResult {
    const {
        page = 1,
        size = 10,
        searchQuery = '',
        setTotal,
        filters = {},
        sort = {}
    } = options;

    const [problems, setProblems] = useState<LeetCodeProblem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchProblems = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            setLoading(true);
            setError(null);

            // Build query parameters
            const params = new URLSearchParams({
                page: page.toString(),
                limit: size.toString(),
                filters: JSON.stringify(filters),
                sort: JSON.stringify(sort),
            });

            // Add search query if present
            if (searchQuery && searchQuery.trim() !== '') {
                params.append('search', searchQuery.trim());
            }

            const response = await axiosClient.get(
                `/leetcode/problems?${params.toString()}`,
                { signal: controller.signal }
            );

            if (response?.data?.data) {
                setProblems(response.data.data.leetcodeProblems || []);
                if (setTotal && typeof response.data.data.totalProblems === "number") {
                    setTotal(response.data.data.totalProblems);
                }
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (err: any) {
            if (err.name !== "AbortError") {
                console.error("Fetch problems error:", err);
                setError(err.message || "Failed to fetch problems");
            }
        } finally {
            setLoading(false);
        }
    }, [page, size, searchQuery, setTotal, JSON.stringify(filters), JSON.stringify(sort)]);

    useEffect(() => {
        fetchProblems();
        return () => {
            abortControllerRef.current?.abort();
        };
    }, [fetchProblems]);

    return {
        problems,
        loading,
        error,
        refetch: fetchProblems,
    };
}