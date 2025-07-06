import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../config/sqs.config.js";

export const sendMessageToQueue = async (
    queueUrl: string,
    messageBody: any,
    messageGroupId?: string // Required for FIFO queues
) => {
    if (!messageGroupId) {
        throw new Error("MessageGroupId is required for FIFO SQS queues.");
    }

    const params = {
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(messageBody),
        MessageGroupId: messageGroupId,
        MessageDeduplicationId: `${Date.now()}-${Math.random()}` // ✅ Ensures uniqueness
    };

    const command = new SendMessageCommand(params);
    await sqsClient.send(command);
};
