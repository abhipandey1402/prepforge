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
            origin: [
                'http://localhost:3000',
                'http://localhost:3001',
                'http://localhost:5173',
            ],
            methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
            credentials: true,
        }),
    );

    app.use(express.json({ limit: '32kb' }));
    app.use(express.urlencoded({ extended: true, limit: '32kb' }));
    app.use(express.static('public'));
    app.use(cookieParser());
}

// Setup routes for API endpoints
const setupRoutes = () => {
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/leetcode", leetcodeRouter);
    app.use("/api/v1/chats", chatRouter);
    app.use("/api/v1/messages", messageRouter);
};

const configureSocket = () => {
    const io = new Server(httpServer, {
        pingTimeout: 60000,
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173',],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    app.set("io", io); // using set method to mount the `io` instance on the app to avoid usage of `global`

    initializeSocketIO(io);
}

const startServer = async () => {
    try {
        connectDB();
        console.log("Connected to the database.");

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
