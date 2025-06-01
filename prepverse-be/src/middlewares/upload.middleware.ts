import multer from "multer";

const storage = multer.memoryStorage(); // Keeps image in memory

const upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024, // Max 2MB
    },
});

export default upload;
