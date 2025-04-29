import { Request, Response, NextFunction } from "express";
import logger from "../logger/winston.logger.js";
import { ApiError } from "./ApiError.js";

const asyncHandler = (
    requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            logger.info("Incoming request", {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                query: req.query,
                body: req.body,
            });

            await requestHandler(req, res, next);
        } catch (err: any) {
            // Log only if it's not an ApiError
            if (!(err instanceof ApiError)) {
                logger.error("Unhandled error in AsyncHandler", {
                    statusCode: err?.statusCode || 500,
                    message: err?.message || "Unhandled error occurred",
                    stack: err.stack,
                });
            }

            // Forward the error to the centralized error handler
            next(err);
        }
    };
};

export { asyncHandler };
