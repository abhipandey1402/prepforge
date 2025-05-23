import axiosClient from "@/interceptors/axiosClient";
import { useEffect, useState } from "react";

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

export function useLeetCodeProblems(
    page: number = 1,
    size: number = 10,
    setTotal: (total: number) => void,
    filters: Filters = {},
    sort: Record<string, any> = {}
) {
    const [problems, setProblems] = useState<LeetCodeProblem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);

                const response = await axiosClient.get(`/leetcode/problems`, {
                    params: {
                        page,
                        limit: size,
                        filters: JSON.stringify(filters),
                        sort: JSON.stringify(sort),
                    },
                });

                if (response?.data?.data) {
                    setProblems(response.data.data.leetcodeProblems);
                    setTotal(response.data.data.totalProblems);
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch problems");
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, [page, size, JSON.stringify(filters), JSON.stringify(sort)]);

    return { problems, loading, error };
}
