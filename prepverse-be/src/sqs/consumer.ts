import {
    ReceiveMessageCommand,
    DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import { sqsClient, QUEUE_URLS } from "../config/sqs.config.js";
import { handleSyncJob } from "../jobs/sync.handler.js";

export const startConsumer = async () => {
    const params = {
        QueueUrl: QUEUE_URLS.SYNC_REQUEST,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20,
        VisibilityTimeout: 300,
    };

    setInterval(async () => {
        const command = new ReceiveMessageCommand(params);
        const response = await sqsClient.send(command);

        if (response.Messages) {
            for (const message of response.Messages) {
                if (!message.Body || !message.ReceiptHandle) continue;

                const job = JSON.parse(message.Body);

                try {
                    await handleSyncJob(job);

                    const deleteParams = {
                        QueueUrl: QUEUE_URLS.SYNC_REQUEST,
                        ReceiptHandle: message.ReceiptHandle,
                    };
                    const deleteCommand = new DeleteMessageCommand(deleteParams);
                    await sqsClient.send(deleteCommand);
                } catch (error) {
                    console.error("Job failed:", error);
                    // Optionally, send failure status to another queue or log
                }
            }
        }
    }, 5000); // Poll every 5 seconds
};
