import { Kafka } from "kafkajs";
import { Server as SocketIOServer } from "socket.io";

const kafka = new Kafka({ clientId: "socket-bridge", brokers: ["localhost:9092"] });

const bridgeConsumer = kafka.consumer({ groupId: "socket-bridge-group" });

export const socketBridgeKafka = async (io: SocketIOServer) => {
    await bridgeConsumer.connect();
    await bridgeConsumer.subscribe({ topic: "leetcode.sync.progress", fromBeginning: false });
    await bridgeConsumer.subscribe({ topic: "leetcode.sync.status", fromBeginning: false });

    await bridgeConsumer.run({
        eachMessage: async ({ topic, message }) => {
            if (!message.value) return;
            const update = JSON.parse(message.value.toString());

            if (topic === "leetcode.sync.progress") {
                io.emit("sync-progress", update);
            }
            if (topic === "leetcode.sync.status") {
                io.emit("sync-status", update);
            }
        },
    });
};
