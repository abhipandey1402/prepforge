import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        // Core Info
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        fullName: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' },
        avatarUrl: String,
        refreshToken: String,

        // LeetCode Integration
        leetcodeUsername: { type: String, unique: true, sparse: true },
        // leetcodeSubmissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],

        // Chat & Call
        // messagesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' }],
        // messagesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' }],
        // callSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CallSession' }],

        // Coding Sessions
        // sessionsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
        // sessionsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SessionFollower' }],
        // collaborationSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CodeTogether' }],

        // Tasks & Teams
        // tasksOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        // sharedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskShare' }],
        // teamsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
        // teamsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],

        // Timers & Notifications
        // timers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timer' }],
        // notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],

        // Puzzle Games & Stats
        // puzzleStats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PuzzleStat' }],

        // Other Configs
        // UserConfig: { type: mongoose.Schema.Types.ObjectId, ref: 'UserConfig' },
        preferences: { type: mongoose.Schema.Types.Mixed }, // Light/Dark theme, etc.
        settings: { type: mongoose.Schema.Types.Mixed }, // Feature flags, toggles
        meta: { type: mongoose.Schema.Types.Mixed }, // Future expansion (e.g. badges, gamification)

        // Progress Tracking
        completedSessions: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
