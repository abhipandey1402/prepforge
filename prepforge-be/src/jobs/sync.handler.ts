import { LeetCodeService } from "../services/leetcode.service.js";
import { sendMessageToQueue } from "../sqs/producer.js";
import { retryWithBackoff } from "../utils/retry.utils.js";
import { QUEUE_URLS } from "../config/sqs.config.js";

const leetcodeService = new LeetCodeService();

export const handleSyncJob = async ({ userId, sessionToken }: any) => {
    console.log(`[SyncJob] 🚀 Starting sync for user ${userId}`);

    const groupId = `leetcode-user-${userId}`;

    const sendStatus = async (status: string, error?: string) => {
        await sendMessageToQueue(
            QUEUE_URLS.SYNC_STATUS,
            {
                userId,
                status,
                ...(error ? { error } : {}),
                timestamp: new Date().toISOString(),
            },
            groupId
        );
    };

    const sendProgress = async (progress: number, message: string) => {
        await sendMessageToQueue(
            QUEUE_URLS.SYNC_PROGRESS,
            {
                userId,
                progress,
                message,
            },
            groupId
        );
    };

    try {
        // Step 1: Send auth success
        await sendMessageToQueue(
            QUEUE_URLS.AUTH_SUCCESS,
            {
                userId,
                authSuccess: true,
                sessionToken,
                timeStamp: new Date().toISOString(),
            },
            groupId
        );

        // Step 2: Send initial status & progress
        await sendStatus("fetching");
        await sendProgress(0, "Starting submission sync");

        // Step 3: Sync stats and heatmap
        await retryWithBackoff(() =>
            leetcodeService.syncLeetcodeStats(userId, sessionToken)
        );

        await retryWithBackoff(() =>
            leetcodeService.syncHeatmap(userId, sessionToken)
        );

        // Step 4: Sync submissions with progress
        let submissionCount = 0;
        await retryWithBackoff(() =>
            leetcodeService.syncSubmissions(userId, sessionToken, async (progress) => {
                submissionCount += progress;

                await sendStatus("fetching");
                await sendProgress(submissionCount, `Fetched ${submissionCount} submissions so far`);
            })
        );

        // Step 5: Assign topics
        await retryWithBackoff(() =>
            leetcodeService.assignTopicsToSubmissions(userId)
        );

        // Step 6: Send success
        await sendStatus("success");
        console.log(`[SyncJob] ✅ Sync completed successfully for user ${userId}`);
    } catch (error: any) {
        console.error(`[SyncJob] ❌ Sync failed for user ${userId}: ${error.message}`);
        await sendStatus("failure", error.message);
    }
};
