import { User } from "../models/user.model.js";  // Importing the Mongoose User model
import { ApiError } from "../utils/ApiError.js";
import { hashPassword, isPasswordCorrect, generateAccessToken, generateRefreshToken } from "../utils/AuthHelper.js";
import * as crypto from 'crypto';
import { emailService } from "./email.service.js";
import { verificationTemplate } from "../templates/emails/verification.template.js";

interface RegisterUserInput {
    fullName: string;
    email: string;
    username: string;
    password: string;
}

interface LoginUserInput {
    email?: string;
    username?: string;
    password: string;
}

interface UpdateUserPayload {
    username?: string;
    fullName?: string;
}

export const registerUser = async (data: RegisterUserInput) => {
    const { fullName, email, username, password } = data;

    // Check if the user with the same email or username already exists
    const existedUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72h

    // Create a new user
    const user = new User({
        fullName,
        email,
        username: username.toLowerCase(),
        password: hashedPassword,
        verificationToken,
        verificationTokenExpires,
        isVerified: false,
    });

    await user.save();

    await emailService.sendMail({
        to: email,
        subject: 'Verify your PrepForge account',
        html: verificationTemplate(`https://prepforge.space/verify-email?token=${verificationToken}`),
        from: `"PrepForge" <noreply@prepforge.space>`
    });

    return { user: { ...user.toObject(), password: undefined, refreshToken: undefined } };
};

export const loginUser = async (data: LoginUserInput) => {
    const { email, username, password } = data;

    // Find the user by email or username
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // ✅ Ensure account is verified first
    if (!user.isVerified) {
        throw new ApiError(403, "Your email is not verified. Please check your inbox and verify your account to log in.");
    }

    // Check if the password is correct
    const isPasswordValid = await isPasswordCorrect(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Update user's refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    return {
        user: { ...user.toObject(), password: undefined, refreshToken: undefined },
        accessToken,
        refreshToken,
    };
};

export const logoutUser = async (userId: string): Promise<void> => {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Remove the refresh token from the user
    user.refreshToken = null;
    await user.save();
};

export const refreshAccessToken = async (incomingRefreshToken: string) => {
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    // Find the user with the refresh token
    const user = await User.findOne({ refreshToken: incomingRefreshToken });
    if (!user) {
        throw new ApiError(403, "Invalid refresh token");
    }

    // Generate new access and refresh tokens
    const newAccessToken = generateAccessToken(user._id.toString());
    const newRefreshToken = generateRefreshToken(user._id.toString());

    // Update user's refresh token in the database
    user.refreshToken = newRefreshToken;
    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if the old password is correct
    const isOldPasswordValid = await isPasswordCorrect(oldPassword, user.password);
    if (!isOldPasswordValid) {
        throw new ApiError(401, "Old password is incorrect");
    }

    // Hash the new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();
};

export const getCurrentUser = async (userId: string) => {
    // Find the user by ID
    const user = await User.findById(userId).select("-password");  // Don't return the password
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

export const updateUserData = async (
    userId: string,
    data: UpdateUserPayload
): Promise<void> => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check for unique username if trying to update
    if (data.username && data.username !== user.username) {
        const existingUser = await User.findOne({ username: data.username });
        if (existingUser) {
            throw new ApiError(409, "Username already taken");
        }
        user.username = data.username;
    }

    if (data.fullName) {
        user.fullName = data.fullName;
    }

    await user.save();
};


export const updateUserAvatarUrl = async (
    userId: string,
    avatarUrl: string
): Promise<void> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.avatarUrl = avatarUrl;
    await user.save();
};


export const verifyEmail = async (token: string): Promise<void> => {
    if (!token) {
        throw new ApiError(400, 'Verification token is missing.');
    }

    // Find user with this token & check expiry
    const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new ApiError(400, 'Invalid or expired verification token.');
    }

    // Mark verified, clear token fields
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();
};
