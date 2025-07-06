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

        const command = new ReceiveMessageCommand(params);
        const response = await sqsClient.send(command);

        if (response.Messages) {
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
    };

    setInterval(() => processQueue(QUEUE_URLS.AUTH_SUCCESS, "auth-success"), 5000);
    setInterval(() => processQueue(QUEUE_URLS.SYNC_PROGRESS, "sync-progress"), 5000);
    setInterval(() => processQueue(QUEUE_URLS.SYNC_STATUS, "sync-status"), 5000);
};
