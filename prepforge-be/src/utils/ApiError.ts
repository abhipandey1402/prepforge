import logger from "../logger/winston.logger.js";
class ApiError extends Error {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
    errors: string[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: string[] = [],
        data: any = null,
        stack: string = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = false;
        this.errors = errors;

        // Capture the stack trace if no stack is provided
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // Method to format the error as a response object
    toResponse() {
        return {
            success: this.success,
            message: this.message,
            errors: this.errors,
            data: this.data,
        };
    }

    logError() {
        logger.error(`StatusCode: ${this.statusCode}, Message: ${this.message}, Errors: ${this.errors}`);
    }
}

export { ApiError };
