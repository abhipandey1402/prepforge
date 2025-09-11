import mongoose, { Schema } from "mongoose";

const TopicInsightSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    topic: {
        type: String,
        required: true,
        index: true,
    },
    insights: {
        type: Schema.Types.Mixed, // store AI JSON output flexibly
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

// Ensure unique per user-topic pair
TopicInsightSchema.index({ userId: 1, topic: 1 }, { unique: true });

export const TopicInsight = mongoose.model("TopicInsight", TopicInsightSchema);
