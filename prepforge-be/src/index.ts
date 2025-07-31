import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { globalErrorHandler } from './utils/GlobalErrorHandler.js';

import userRouter from './routes/user.routes.js';
import leetcodeRouter from './routes/leetcode.routes.js'
import connectDB from './db/index.js';
import { Server } from 'socket.io';
import { initializeSocketIO } from './sockets/index.js';
import chatRouter from './routes/chat.routes.js';
import messageRouter from './routes/message.routes.js';
// import agentRouter from './routes/agent.routes.js';
import healthRouter from './routes/health.routes.js';
import { startConsumer } from './sqs/consumer.js';
import { socketBridgeSQS } from './sockets/sqs.bridge.js';


// Load environment variables
dotenv.config({
    path: './.env',
});

const app: Application = express();
const httpServer = createServer(app);


// Middleware

const configureMiddleware = () => {
    app.use(
        cors({
            origin: (origin, callback) => {
                const allowedOrigins = [
                    'http://localhost:3000',
                    'http://localhost:5173',
                    'chrome-extension://ejggddpdebjhdpamcbngbajonapihakm',
                    'https://www.prepforge.space',
                    'https://prepforge.space',
                ];

                // Allow requests with no origin (native mobile, curl, Chrome extensions)
                if (!origin) {
                    callback(null, true);
                }
                // Allow if origin is explicitly allowed
                else if (allowedOrigins.includes(origin)) {
                    callback(null, true);
                }
                // ✅ Allow any other origin too (wildcard)
                else {
                    console.warn(`CORS WARNING: Allowing unlisted origin ${origin}`);
                    callback(null, true); // This means "allow any other origin"
                }
            },
            methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
        }),
    );

    app.use(express.json({ limit: '32kb' }));
    app.use(express.urlencoded({ extended: true, limit: '32kb' }));
    app.use(express.static('public'));
    app.use(cookieParser());
};


// Setup routes for API endpoints
const setupRoutes = () => {
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/leetcode", leetcodeRouter);
    app.use("/api/v1/chats", chatRouter);
    app.use("/api/v1/messages", messageRouter);
    // app.use("/api/v1/agents", agentRouter);
    app.use("/api/health", healthRouter); // ✅ Add health check route
};

const configureSocket = () => {
    const io = new Server(httpServer, {
        pingTimeout: 60000,
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:5173', 'https://www.prepforge.space', 'https://prepforge.space'],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    app.set("io", io); // using set method to mount the `io` instance on the app to avoid usage of `global`

    initializeSocketIO(io);

    // Connect SQS <-> Socket bridge
    socketBridgeSQS(io);  // SQS sync-status -> socket.io emit
}

const startServer = async () => {
    try {
        connectDB();
        console.log("Connected to the database.");

        // SQS consumers
        await startConsumer(); // leetcode.sync.request → async job

        const port = process.env.PORT || 8000;
        httpServer.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        });
    } catch (err) {
        console.error('Database connection failed!', err);
        process.exit(1); // Gracefully exit if DB connection fails
    }
}


const initializeApp = () => {
    configureMiddleware();
    setupRoutes();
    configureSocket();
    app.use(globalErrorHandler);
}

initializeApp();
startServer();


export { app };
