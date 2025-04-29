import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import * as authService from "../services/user.service.js";

export const registerUser = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { fullName, email, username, password } = req.body;
    const { user, accessToken } = await authService.registerUser({ fullName, email, username, password });
    res.status(201).json(
        new ApiResponse(201, { user, accessToken }, "User registered successfully")
    );
});

export const loginUser = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { email, username, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser({ email, username, password });
    const options = { httpOnly: true, secure: true };

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

    const options = { httpOnly: true, secure: true };
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
