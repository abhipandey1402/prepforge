import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError.js";
import logger from "../logger/winston.logger.js";

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof ApiError) {
        // Log the ApiError
        logger.error("ApiError occurred", {
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors,
            stack: err.stack,
        });

        // Respond with the error details
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    } else {
        // Log other unexpected errors
        logger.error("Unexpected error occurred", {
            statusCode: 500,
            message: err.message || "Internal server error",
            stack: err.stack,
        });

        // Respond with a generic error
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export { globalErrorHandler };
