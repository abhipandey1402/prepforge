import { asyncHandler } from "../utils/AsyncHandler.js";
import { runMentorGraph } from "../langgraph/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getTopicWiseAIInsights = asyncHandler(async (req: any, res: any) => {
    const { topic, limit } = req.body;

    // ✅ Use verified token from your verified user
    const userJWT = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    const aiInsights = await runMentorGraph(topic, limit, userJWT);

    return res
        .status(200)
        .json(new ApiResponse(200, aiInsights, "AI Insights fetched for the topic"));
});
