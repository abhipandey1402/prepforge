import { Kafka } from "kafkajs";
import { handleSyncJob } from "../jobs/sync.handler.js";

const kafka = new Kafka({
    clientId: "leetcode-consumer",
    brokers: ["localhost:9092"]
});

export const consumer = kafka.consumer({
    groupId: "leetcode-group",
    sessionTimeout: 300_000,
    heartbeatInterval: 30_000,
});

export const startConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "leetcode.sync.request", fromBeginning: false });

    await consumer.run({
        eachBatch: async ({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary, isRunning, isStale }) => {
            for (const message of batch.messages) {
                if (!isRunning() || isStale()) break;
                if (!message.value) continue;

                const job = JSON.parse(message.value.toString());

                try {
                    // 🛡️ Periodic heartbeat during long job
                    const heartbeatInterval = setInterval(() => {
                        heartbeat().catch(console.error);
                    }, 30_000); // every 30 seconds

                    await handleSyncJob(job);

                    clearInterval(heartbeatInterval);

                    resolveOffset(message.offset); // ✅ Mark offset done
                    await commitOffsetsIfNecessary(); // ✅ Persist offset
                    await heartbeat(); // ✅ Let broker know we're alive
                } catch (err) {
                    console.error("Job failed:", err);
                    // Optional: send failure status to Kafka
                }
            }
        },
    });
};