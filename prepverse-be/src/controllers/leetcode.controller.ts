import { LeetCodeService } from '../services/leetcode.service.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

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

    const data = await leetcodeService.getLeetcodeSubmissions(userId);

    res.status(200).json(
        new ApiResponse(200, data, "Leetcode submission fetched")
    )
});

export const fetchLeetcodeSubmissions = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;
    const { sessionToken } = req.body;

    if(!sessionToken){
        throw new ApiError(400, "Missing LeetCode session token");
    }

    await leetcodeService.fetchLeetcodeSubmissions(userId, sessionToken);

    res.status(200).json(
        new ApiResponse(200, "Leetcode Submissions Fetched successfully", "Leetcode Submissions Fetched successfully")
    )
});

