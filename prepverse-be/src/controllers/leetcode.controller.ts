import { LeetCodeService } from '../services/leetcode.service.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { parseQuery } from '../utils/queryParser.js';
import { userStats } from '../models/leetcode.model.js';

const leetcodeService = new LeetCodeService();

export const fetchLeetCodeSession = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;
    const token = await leetcodeService.getLeetCodeSession(userId);

    res.status(200).json(
        new ApiResponse(200, { leetcodeSessionToken: token }, "Leetcode Session Token fetched successfully")
    )
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

    const stats = await leetcodeService.syncLeetcodeStats(sessionToken);

    const updatedStats = await userStats.findOneAndUpdate(
        { userId },
        { ...stats, userId, updatedAt: new Date() },
        { new: true, upsert: true }
    );

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