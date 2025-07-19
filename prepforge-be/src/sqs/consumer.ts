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
        WaitTimeSeconds: 20, // Long polling: wait up to 20 sec for messages
        VisibilityTimeout: 300,
    };


    const poll = async () => {
        while (true) {
            try {
                const command = new ReceiveMessageCommand(params);
                const response = await sqsClient.send(command);

                if (response.Messages && response.Messages.length > 0) {
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
                        }
                    }
                }
            } catch (error) {
                // Optional: sleep briefly before retrying on errors
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        }
    };

    poll();
};
