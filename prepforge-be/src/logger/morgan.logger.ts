import morgan, { StreamOptions } from "morgan";
import logger from "./winston.logger.js";

// Define the stream object with a custom write method
const stream: StreamOptions = {
    // Use the http severity
    write: (message: string): any => logger.http(message.trim()),
};

// Define the skip function to conditionally skip logging based on NODE_ENV
const skip = (): boolean => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

// Create the morgan middleware with custom format, stream, and skip function
const morganMiddleware = morgan(
    ":remote-addr :method :url :status - :response-time ms",
    { stream, skip }
);

export default morganMiddleware;
