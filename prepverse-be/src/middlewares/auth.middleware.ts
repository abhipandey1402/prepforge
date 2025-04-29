import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js"; // Import Mongoose User model

// Define the extended Request type to include 'user' property
interface CustomRequest extends Request {
    user?: any; // You can type this more specifically based on your user model
}

export const verifyJWT = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get the token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Decode and verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

        // Find the user by decoded ID using Mongoose
        const user = await User.findById(decodedToken?.id).select("id email username"); // Exclude sensitive fields like password

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error: any) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
