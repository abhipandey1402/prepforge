import { LeetCodeService } from "../services/leetcode.service.js";
import { sendMessageToQueue } from "../sqs/producer.js";
import { retryWithBackoff } from "../utils/retry.utils.js";
import { QUEUE_URLS } from "../config/sqs.config.js";

const leetcodeService = new LeetCodeService();

export const handleSyncJob = async ({ userId, sessionToken }: any) => {
    console.log(`[SyncJob] Processing user ${userId}...`);

    try {
        await sendMessageToQueue(QUEUE_URLS.AUTH_SUCCESS, {
            userId,
            authSuccess: true,
            sessionToken: sessionToken,
            timeStamp: new Date().toISOString(),
        },
            `leetcode-user-${userId}`
        );

        await sendMessageToQueue(QUEUE_URLS.SYNC_STATUS, {
            userId,
            status: "fetching",
            timestamp: new Date().toISOString(),
        },
            `leetcode-user-${userId}`
        );

        await sendMessageToQueue(QUEUE_URLS.SYNC_PROGRESS, {
            userId,
            progress: 0,
            message: "Starting submission sync",
        },
            `leetcode-user-${userId}`
        );

        let submissionCount = 0;
        await retryWithBackoff(() =>
            leetcodeService.syncSubmissions(userId, sessionToken, async (progress) => {
                submissionCount += progress;

                await sendMessageToQueue(QUEUE_URLS.SYNC_STATUS, {
                    userId,
                    status: "fetching",
                    timestamp: new Date().toISOString(),
                },
                    `leetcode-user-${userId}`
                );

                await sendMessageToQueue(QUEUE_URLS.SYNC_PROGRESS, {
                    userId,
                    progress: submissionCount,
                    message: `Fetched ${submissionCount} submissions so far`,
                },
                    `leetcode-user-${userId}`
                );
            })
        );

        await retryWithBackoff(() =>
            leetcodeService.syncLeetcodeStats(userId, sessionToken)
        );

        await sendMessageToQueue(QUEUE_URLS.SYNC_STATUS, {
            userId,
            status: "success",
            timestamp: new Date().toISOString(),
        },
            `leetcode-user-${userId}`
        );
    } catch (error: any) {
        await sendMessageToQueue(QUEUE_URLS.SYNC_STATUS, {
            userId,
            status: "failure",
            error: error.message,
            timestamp: new Date().toISOString(),
        },
            `leetcode-user-${userId}`
        );
    }
};
