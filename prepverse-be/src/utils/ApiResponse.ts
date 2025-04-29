import logger from "../logger/winston.logger.js";

class ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: T, message: string = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;

        // Log the response
        if (this.success) {
            logger.info("ApiResponse sent", {
                statusCode: this.statusCode,
                message: this.message,
                data: this.data,
            });
        } else {
            logger.warn("ApiResponse sent with warnings/errors", {
                statusCode: this.statusCode,
                message: this.message,
                data: this.data,
            });
        }
    }
}

export { ApiResponse };
