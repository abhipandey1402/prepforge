import { LeetCodeService } from '../services/leetcode.service.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { parseQuery } from '../utils/queryParser.js';
import { sendMessageToQueue } from '../sqs/producer.js';

const leetcodeService = new LeetCodeService();

export const saveLeetcodeSession = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;
    const { token: leetcodeSessionToken } = req.body;
    const token = await leetcodeService.saveLeetcodeSession(userId, leetcodeSessionToken);

    res.status(200).json(
        new ApiResponse(200, { leetcodeSessionToken: token }, "Leetcode Session Token saved successfully")
    )

    await sendMessageToQueue(
        process.env.SQS_SYNC_REQUEST_URL!,
        { userId, sessionToken: token },
        `leetcode-user-${userId}`
    );
});

export const getLeetcodeSubmissions = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;
    const { filters, skip, limit, page } = parseQuery(req.query);

    const { total, submissions } = await leetcodeService.getLeetcodeSubmissions(userId, filters, limit, skip);

    res.status(200).json(
        new ApiResponse(200, {
            page,
            totalPages: Math.ceil(total / limit),
            totalSubmissions: total,
            submissions
        }, "Leetcode submissions fetched")
    );
});


export const syncSubmissions = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;
    const { sessionToken } = req.body;

    if (!sessionToken) {
        throw new ApiError(400, "Missing LeetCode session token");
    }

    await leetcodeService.syncSubmissions(userId, sessionToken);

    res.status(200).json(
        new ApiResponse(200, "Leetcode Submissions Fetched successfully", "Leetcode Submissions Fetched successfully")
    )
});

export const syncAllProblems = asyncHandler(async (req: any, res: any): Promise<void> => {
    await leetcodeService.syncAllProblems();

    res.status(200).json(
        new ApiResponse(200, "All Problems fetched successfully", "All Problems fetched successfully")
    )
})

export const syncHeatmap = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;
    const { sessionToken } = req.query

    if (!userId || !sessionToken) {
        throw new ApiError(400, 'Missing userId or leetcode session in query params');
    }

    await leetcodeService.syncHeatmap(userId, sessionToken);

    res.status(200).json(
        new ApiResponse(200, "Heatmap Synced successfully and saved to DB")
    );
})

export const getLeetcodeProblems = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { filters, sort, skip, limit, page } = parseQuery(req.query);

    const { total, leetcodeProblems } = await leetcodeService.getLeetcodeProblems(filters, sort, limit, skip);

    res.status(200).json(
        new ApiResponse(200, { page, totalPages: Math.ceil(total / limit), totalProblems: total, leetcodeProblems: leetcodeProblems })
    )
})

export const syncLeetcodeStats = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;
    const { sessionToken } = req.body;

    if (!userId || !sessionToken) {
        throw new ApiError(400, 'userId and leetcodeSession required');
    }

    const updatedStats = await leetcodeService.syncLeetcodeStats(userId, sessionToken);

    res.status(200).json(
        new ApiResponse(200, { leetcodeUserStats: updatedStats }, "user leetcode stats synced successfully")
    )
})

export const getLeetcodeStats = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;

    if (!userId) {
        throw new ApiError(400, "UserId required");
    }

    const stats = await leetcodeService.getLeetcodeStats(userId);

    res.status(200).json(
        new ApiResponse(200, stats, "User Leetcode stats fetched successfully")
    )
})

export const getLeetcodeHeatmap = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;

    if (!userId) {
        throw new ApiError(400, "UserId required");
    }

    const heatmap = await leetcodeService.getLeetcodeHeatmap(userId);

    res.status(200).json(
        new ApiResponse(200, heatmap, "Leetcode Heatmap data fetched successfully")
    );
});

export const assignTopicsToSubmissions = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;

    if (!userId) {
        throw new ApiError(400, "UserId required");
    }

    const response = await leetcodeService.assignTopicsToSubmissions(userId);

    res.status(200).json(
        new ApiResponse(200, response, "Assigned topics successFully.")
    );
})

export const getSubmissionsByTopic = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;
    const { topic, limit } = req.body;

    if (!userId) {
        throw new ApiError(400, "Invalid or missing userId");
    }

    if (!topic || typeof topic !== "string") {
        return res.status(400).json({ error: "Invalid or missing topic" });
    }

    const finalLimit = limit && Number.isInteger(limit) && limit > 0 ? limit : 5;

    const submissions = await leetcodeService.getSubmissionsByTopic(userId, topic, finalLimit);

    res.status(200).json(
        new ApiResponse(200, {userId, topic, limit: finalLimit, submissions}, "Submissions fetched for the topic")
    )
})