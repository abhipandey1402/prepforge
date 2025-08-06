import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "https://api.prepforge.space/api/v1";

export function createSubmissionTools(userJWT: string) {
    return [
        new DynamicStructuredTool({
            name: "get_submissions_by_topic",
            description: "Fetches recent submissions for a given topic, up to a limit",
            schema: z.object({
                topic: z.string(),
                limit: z.number(),
            }),
            func: async ({ topic, limit }) => {
                const response = await axios.post(
                    `${API_BASE_URL}/leetcode/get-submissions-by-topic`,
                    { topic, limit },
                    {
                        headers: {
                            "Authorization": `Bearer ${userJWT}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.data) {
                    throw new Error("Empty response from API.");
                }

                return JSON.stringify(response.data?.data || []);
            },
        }),
    ];
}
