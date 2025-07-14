import mongoose, { Schema } from "mongoose";

const LeetCodeSubmissionSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },

        // Core submission info
        submissionId: { type: Number, required: true, unique: true }, // LeetCode's ID
        questionId: { type: Number, required: true },
        frontendId: { type: Number }, // e.g. 14, 15, 16...

        title: { type: String, required: true },
        titleSlug: { type: String, required: true },
        url: { type: String, required: true },

        lang: { type: String, required: true },        // 'java'
        langName: { type: String },                    // 'Java'

        status: { type: Number },                      // 10 = Accepted
        statusDisplay: { type: String },               // 'Accepted'
        isPending: { type: String },                   // 'Not Pending'

        runtime: { type: String },                     // '24 ms'
        memory: { type: String },                      // '60.7 MB'

        code: { type: String },                        // full submitted code
        compareResult: { type: String },               // "111111..." (bitstring)

        timeAgo: { type: String },                     // "2 years, 10 months"
        timestamp: { type: Number },                   // UNIX timestamp

        hasNotes: { type: Boolean },
        flagType: { type: Number },
        topicTags: [String]
    },
    { timestamps: true }
);

// Compound index for quick lookup by user and problem
LeetCodeSubmissionSchema.index({ userId: 1, titleSlug: 1 });

export const LeetCodeSubmission = mongoose.model('LeetCodeSubmission', LeetCodeSubmissionSchema);

const allProblemSchema = new Schema({
    id: String,
    title: String,
    titleSlug: String,
    questionFrontendId: String,
    difficulty: String,
    paidOnly: Boolean,
    topicTags: [{ name: String, slug: String }],
    status: String,
    acRate: Number
});

export const allProblems = mongoose.model('AllProblem', allProblemSchema);

const UserStatsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    totalSolved: Number,
    easySolved: Number,
    mediumSolved: Number,
    hardSolved: Number,
    acceptanceRate: Number,
    streak: Number,
    ranking: Number,
    updatedAt: { type: Date, default: Date.now }
});

export const userStats = mongoose.model('UserStats', UserStatsSchema);

const HeatmapSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    activeYears: [Number],
    streak: Number,
    totalActiveDays: Number,
    dccBadges: [
        {
            timestamp: Number,
            badge: {
                name: String,
                icon: String,
            },
        },
    ],
    submissionCalendar: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: { type: Date, default: Date.now },
});

HeatmapSchema.index({ userId: 1, year: 1 }, { unique: true });

export const heatmap = mongoose.model('Heatmap', HeatmapSchema);

