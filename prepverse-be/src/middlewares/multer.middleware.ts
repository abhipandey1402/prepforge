import multer, { StorageEngine } from "multer";
import { Request } from "express";
import path from "path";

// Define storage engine with type safety
const storage: StorageEngine = multer.diskStorage({
    destination: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) {
        // This storage requires a public/images folder in the root directory.
        // Else, it will throw an error saying it cannot find the path public/images.
        cb(null, "./public/images");
    },
    // Store file with a formatted name in .png/.jpeg/.jpg format instead of binary
    filename: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
    ) {
        let fileExtension = "";

        if (file.originalname.includes(".")) {
            fileExtension = path.extname(file.originalname);
        }

        const filenameWithoutExtension = file.originalname
            .toLowerCase()
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .split(".")[0]; // Remove the file extension

        cb(
            null,
            `${filenameWithoutExtension}-${Date.now()}-${Math.ceil(
                Math.random() * 1e5
            )}${fileExtension}` // Avoid rare name conflict
        );
    },
});

// Export the `multer` instance with storage and file size limits
export const upload = multer({
    storage,
    limits: {
        fileSize: 1 * 1000 * 1000, // 1 MB file size limit
    },
});
