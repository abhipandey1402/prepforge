import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import * as authService from "../services/user.service.js";
import { uploadOptimizedImageToCloudinary } from "../utils/Cloudinary.config.js";

export const registerUser = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { fullName, email, username, password } = req.body;
    const { user } = await authService.registerUser({ fullName, email, username, password });
    res.status(201).json(
        new ApiResponse(201, { user }, "User registered successfully")
    );
});

export const loginUser = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { email, username, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser({ email, username, password });

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "lax" as const,
        path: "/",
    };

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully")
        );
});

export const logoutUser = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;
    await authService.logoutUser(userId);

    const options = { httpOnly: true, secure: true, sameSite: "lax" };
    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

export const refreshAccessToken = asyncHandler(async (req: any, res: any): Promise<void> => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    const { accessToken, refreshToken } = await authService.refreshAccessToken(incomingRefreshToken);
    const options = { httpOnly: true, secure: true };

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
});

export const changeCurrentPassword = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(req.user.id, oldPassword, newPassword);

    res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

export const getCurrentUser = asyncHandler(async (req: any, res: any): Promise<void> => {
    const user = await authService.getCurrentUser(req.user.id);
    res.status(200).json(new ApiResponse(200, { user }, "User fetched successfully"));
});

export const updateCurrentUserData = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { username, fullName } = req.body;

    if (!username && !fullName) {
        res.status(400).json(new ApiResponse(400, {}, "Nothing to update"));
        return;
    }

    await authService.updateUserData(req.user.id, { username, fullName });

    res.status(200).json(new ApiResponse(200, {}, "User data updated successfully"));
});


export const updateUserAvatar = asyncHandler(async (req: any, res: any): Promise<void> => {
    if (!req.file) {
        res.status(400)
            .json(new ApiResponse(400, {}, "No avatar file provided"));
        return;
    }

    const result = await uploadOptimizedImageToCloudinary(req.file.buffer);

    await authService.updateUserAvatarUrl(req.user.id, result.secure_url);

    res.status(200)
        .json(
            new ApiResponse(200, { avatarUrl: result.secure_url }, "Avatar updated")
        );
});

export const verifyEmail = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { token } = req.query;

    await authService.verifyEmail(token);

    res.status(200).json(
        new ApiResponse(200, "Email verified successfully. You can now log in.", "Email verified successfully. You can now log in.")
    );
});