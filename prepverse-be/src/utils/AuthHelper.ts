import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

/**
 * Hashes a password before saving to the database.
 * @param password - The plaintext password.
 * @returns {Promise<string>} - The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

/**
 * Compares a plaintext password with the hashed password.
 * @param password - The plaintext password.
 * @param hashedPassword - The hashed password from the database.
 * @returns {Promise<boolean>} - True if the password matches, false otherwise.
 */
export const isPasswordCorrect = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generates an access token for a user.
 * @param payload - The payload to include in the token (e.g., user details).
 * @returns {string} - The generated access token.
 */
export const generateAccessToken = (userId: string): string => {
    if (!userId) {
        throw new Error("User ID is required to generate an access token");
    }

    // Create payload as a plain object
    const payload = { id: userId };

    const options: SignOptions = { expiresIn: process.env.ACCESS_TOKEN_EXPIRY };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, options);
};

/**
 * Generates a refresh token for a user.
 * @param payload - The payload to include in the token (e.g., user ID).
 * @returns {string} - The generated refresh token.
 */
export const generateRefreshToken = (userId: string): string => {
    if (!userId) {
        throw new Error("User ID is required to generate a refresh token");
    }

    // Create payload as a plain object
    const payload = { id: userId };

    const options: SignOptions = { expiresIn: process.env.REFRESH_TOKEN_EXPIRY };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, options);
};
