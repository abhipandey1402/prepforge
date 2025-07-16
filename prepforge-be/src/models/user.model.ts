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
        leetcodeSessionToken: String,

        // LeetCode Integration
        leetcodeUsername: { type: String, unique: true, sparse: true },
        leetcodeSubmissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LeetCodeSubmission' }],

        // Chat & Call
        // messagesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' }],
        // messagesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' }],
        // callSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CallSession' }],

        // notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],

        // UserConfig: { type: mongoose.Schema.Types.ObjectId, ref: 'UserConfig' },
        preferences: { type: mongoose.Schema.Types.Mixed }, // Light/Dark theme, etc.
        settings: { type: mongoose.Schema.Types.Mixed }, // Feature flags, toggles
        meta: { type: mongoose.Schema.Types.Mixed }, // Future expansion (e.g. badges, gamification)

        verificationToken: { type: String },
        verificationTokenExpires: { type: Date },
        isVerified: { type: Boolean, default: false },

        // Progress Tracking
        completedSessions: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
