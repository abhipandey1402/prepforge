import fs from "fs";
import { Request } from "express";
import logger from "../logger/winston.logger.js";

interface PaginateOptions {
    page?: number;
    limit?: number;
    pagination?: boolean;
    customLabels?: Record<string, any>;
}

/**
 * Utility function to only include fields present in the fieldsArray.
 *
 * @param fieldsArray - Array of fields to retain.
 * @param objectArray - Array of objects to filter.
 * @returns Filtered array of objects containing only the specified fields.
 */
export const filterObjectKeys = <T extends Record<string, any>>(
    fieldsArray: string[],
    objectArray: T[]
): Partial<T>[] => {
    return structuredClone(objectArray).map((originalObj) => {
        const obj: Partial<T> = {};
        structuredClone(fieldsArray).forEach((field) => {
            if (field?.trim() in originalObj) {
                obj[field as keyof T] = originalObj[field as keyof T];
            }
        });
        return Object.keys(obj).length > 0 ? obj : originalObj;
    });
};

/**
 * Paginate a given data array.
 *
 * @param dataArray - Array of data to paginate.
 * @param page - Current page number.
 * @param limit - Items per page.
 * @returns Paginated payload.
 */
export const getPaginatedPayload = <T>(
    dataArray: T[],
    page: number,
    limit: number
): {
    previousPage: boolean;
    currentPage: number;
    nextPage: boolean;
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPageItems: number;
} => {
    const startPosition = (page - 1) * limit;

    const totalItems = dataArray.length;
    const totalPages = Math.ceil(totalItems / limit);

    const paginatedData = structuredClone(dataArray).slice(
        startPosition,
        startPosition + limit
    );

    return {
        previousPage: page > 1,
        currentPage: page,
        nextPage: page < totalPages,
        totalItems,
        totalPages,
        currentPageItems: paginatedData.length,
        data: paginatedData,
    };
};

/**
 * Get the static file path for an uploaded file.
 *
 * @param req - Express request object.
 * @param fileName - File name.
 * @returns Static file path.
 */
export const getStaticFilePath = (req: Request, fileName: string): string => {
    return `${req.protocol}://${req.get("host")}/images/${fileName}`;
};

/**
 * Get the local file path for an uploaded file.
 *
 * @param fileName - File name.
 * @returns Local file path.
 */
export const getLocalPath = (fileName: string): string => {
    return `public/images/${fileName}`;
};

/**
 * Remove a local file from the file system.
 *
 * @param localPath - Path to the file.
 */
export const removeLocalFile = (localPath: string): void => {
    fs.unlink(localPath, (err) => {
        if (err) {
            logger.error("Error while removing local files: ", err);
        } else {
            logger.info("Removed local: ", localPath);
        }
    });
};

/**
 * Remove unused uploaded files when an API call fails.
 *
 * @param req - Express request object.
 */
export const removeUnusedMulterImageFilesOnError = (req: any): void => {
    try {
        const multerFile = req.file;
        const multerFiles = req.files as Record<string, Express.Multer.File[]>;

        if (multerFile) {
            removeLocalFile(multerFile.path);
        }

        if (multerFiles) {
            Object.values(multerFiles).forEach((fileFields) => {
                fileFields.forEach((fileObject) => {
                    removeLocalFile(fileObject.path);
                });
            });
        }
    } catch (error) {
        logger.error("Error while removing image files: ", error);
    }
};

/**
 * Get mongoose pagination options with custom labels.
 *
 * @param options - Pagination options.
 * @returns Mongoose pagination options.
 */
export const getMongoosePaginationOptions = ({
    page = 1,
    limit = 10,
    customLabels = {},
}: {
    page?: number;
    limit?: number;
    customLabels?: {};
}): PaginateOptions => {
    return {
        page: Math.max(page, 1),
        limit: Math.max(limit, 1),
        pagination: true,
        customLabels: {
            pagingCounter: "serialNumberStartFrom",
            ...customLabels,
        },
    };
};

/**
 * Generate a random number.
 *
 * @param max - Ceiling value (exclusive).
 * @returns A random integer less than max.
 */
export const getRandomNumber = (max: number): number => {
    return Math.floor(Math.random() * max);
};
