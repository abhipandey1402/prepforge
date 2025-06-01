import { LeetCodeService } from "../services/leetcode.service.js";
import { sendKafkaMessage } from "../kafka/producer.js";
import { retryWithBackoff } from "./retry.utils.js";

const leetcodeService = new LeetCodeService();

export const handleSyncJob = async ({ userId, sessionToken }: any) => {
    console.log(`[SyncJob] Processing user ${userId}...`);

    try {
        await sendKafkaMessage("leetcode.sync.status", userId, {
            userId,
            status: "fetching",
            timestamp: new Date().toISOString(),
        });

        await sendKafkaMessage("leetcode.sync.progress", userId, {
            userId,
            progress: 0,
            message: "Starting submission sync"
        });

        let submissionCount = 0;
        await retryWithBackoff(() => leetcodeService.syncSubmissions(userId, sessionToken, (progress) => {
            submissionCount += progress;

            sendKafkaMessage("leetcode.sync.status", userId, {
                userId,
                status: "fetching",
                timestamp: new Date().toISOString(),
            });

            sendKafkaMessage("leetcode.sync.progress", userId, {
                userId,
                progress: submissionCount,
                message: `Fetched ${submissionCount} submissions so far`
            });
        }));

        await retryWithBackoff(() => leetcodeService.syncLeetcodeStats(userId, sessionToken));

        await sendKafkaMessage("leetcode.sync.status", userId, {
            userId,
            status: "success",
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        await sendKafkaMessage("leetcode.sync.status", userId, {
            userId,
            status: "failure",
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
};