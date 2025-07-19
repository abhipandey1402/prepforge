import {
    ReceiveMessageCommand,
    DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import { sqsClient, QUEUE_URLS } from "../config/sqs.config.js";
import { Server as SocketIOServer } from "socket.io";

export const socketBridgeSQS = async (io: SocketIOServer) => {
    const processQueue = async (queueUrl: string, event: string) => {
        const params = {
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 20,
            VisibilityTimeout: 60,
        };


        while (true) {
            try {
                const command = new ReceiveMessageCommand(params);
                const response = await sqsClient.send(command);

                if (response.Messages && response.Messages.length > 0) {
                    for (const message of response.Messages) {
                        if (!message.Body || !message.ReceiptHandle) continue;

                        const update = JSON.parse(message.Body);
                        io.emit(event, update);

                        const deleteParams = {
                            QueueUrl: queueUrl,
                            ReceiptHandle: message.ReceiptHandle,
                        };
                        const deleteCommand = new DeleteMessageCommand(deleteParams);
                        await sqsClient.send(deleteCommand);

                    }
                }
            } catch (error) {
                // Optional: sleep a bit on error to avoid tight error loop
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        }
    };

    // Start each queue processor in parallel
    processQueue(QUEUE_URLS.AUTH_SUCCESS, "auth-success");
    processQueue(QUEUE_URLS.SYNC_PROGRESS, "sync-progress");
    processQueue(QUEUE_URLS.SYNC_STATUS, "sync-status");
};
