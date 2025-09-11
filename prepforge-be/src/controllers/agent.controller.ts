import { asyncHandler } from "../utils/AsyncHandler.js";
import { runMentorGraph } from "../langgraph/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { TopicInsight } from "../models/TopicInsight.js";

export const getTopicWiseAIInsights = asyncHandler(async (req: any, res: any) => {
    const { topic, limit } = req.body;

    // ✅ Use verified token from your verified user
    const userJWT = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    const userId = req.user?._id;

    const aiInsights = await runMentorGraph(topic, limit, userJWT, userId);

    return res
        .status(200)
        .json(new ApiResponse(200, aiInsights, "AI Insights fetched for the topic"));
});

export const getAllAIInsights = asyncHandler(async (req: any, res: any) => {
    const userId = req.user?._id;

    if (!userId) {
        return res
            .status(401)
            .json(new ApiResponse(401, null, "Unauthorized: user not found"));
    }

    const insights = await TopicInsight.find({ userId }).sort({ updatedAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, insights, "All AI Insights fetched"));
});