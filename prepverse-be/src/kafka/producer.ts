import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "leetcode-service",
    brokers: ["localhost:9092"]
});

export const producer = kafka.producer();
await producer.connect();

export const sendKafkaMessage = async (topic: string, key: string, message: any) => {
    await producer.send({
        topic,
        messages: [
            {
                key,
                value: JSON.stringify(message),
            },
        ],
    });
};