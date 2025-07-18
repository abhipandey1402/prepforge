import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import axios from 'axios'
import { allProblems, heatmap, LeetCodeSubmission, userStats } from '../models/leetcode.model.js';
import mongoose, { PipelineStage, Types } from 'mongoose';
import { RawSubmission } from '../Interface/leetcode.interface.js';
import { getLeetcodePayload, getLeetcodeStatsPayload, getUserHeatmapPayload } from '../utils/leetcodePayload.js';

export class LeetCodeService {
    private static readonly MAX_WAIT_TIME_MS = 5 * 60 * 1000; // 5 minutes
    private static readonly POLLING_INTERVAL_MS = 2000; // 2 seconds

    public async saveLeetcodeSession(userId: string, leetcodeSessionToken: string): Promise<string | null> {
        // ✅ Save token to the user model
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        user.leetcodeSessionToken = leetcodeSessionToken;
        await user.save();

        console.log(`[✅] LEETCODE_SESSION token saved to user: ${leetcodeSessionToken}`);
        return leetcodeSessionToken;
    }


    private static saveSubmissions = async (userId: string | Types.ObjectId, submissions: RawSubmission[]): Promise<void> => {
        const submissionIds = submissions.map(sub => sub.id);

        // Get existing submission IDs
        const existingIds = await LeetCodeSubmission
            .find({ userId, submissionId: { $in: submissionIds } })
            .distinct('submissionId');

        // Filter out already existing submissions
        const newSubmissions = submissions.filter(sub => !existingIds.includes(sub.id));
        if (newSubmissions.length === 0) return;

        const BATCH_SIZE = 50;
        for (let i = 0; i < newSubmissions.length; i += BATCH_SIZE) {
            const batch = newSubmissions.slice(i, i + BATCH_SIZE);
            const formatted = batch.map((sub): any => ({
                userId,
                submissionId: sub.id,
                questionId: sub.question_id,
                frontendId: sub.frontend_id,
                title: sub.title,
                titleSlug: sub.title_slug,
                url: sub.url,
                lang: sub.lang,
                langName: sub.lang_name,
                status: sub.status,
                statusDisplay: sub.status_display,
                isPending: sub.is_pending,
                runtime: sub.runtime,
                memory: sub.memory,
                code: sub.code,
                compareResult: sub.compare_result,
                timeAgo: sub.time,
                timestamp: sub.timestamp,
                hasNotes: sub.has_notes,
                flagType: sub.flag_type,
            }));

            try {
                const inserted = await LeetCodeSubmission.insertMany(formatted, { ordered: false });
                const insertedIds = inserted.map(sub => sub._id);

                await User.updateOne(
                    { _id: userId },
                    { $addToSet: { leetcodeSubmissions: { $each: insertedIds } } }
                );
            } catch (err) {
                console.error("Batch insert failed:", err);
                // Continue to next batch even if this one fails
            }
        }
    };

    private static fetchUsernameFromSession = async (sessionToken: string): Promise<string | null> => {
        try {
            const query = {
                query: `{userStatus 
                    {
                    username
                    }}`
            };

            const response = await axios.post('https://leetcode.com/graphql/', query, {
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: `LEETCODE_SESSION=${sessionToken}`
                }
            });

            return response.data?.data?.userStatus?.username || null;
        } catch (err: any) {
            console.error('Failed to fetch username from session:', err.message);
            return null;
        }
    };

    public syncSubmissions = async (userId: string, sessionToken: string, onProgress?: (count: number) => void | any): Promise<void> => {
        const username = await LeetCodeService.fetchUsernameFromSession(sessionToken);
        if (!username) throw new ApiError(404, 'Unable to get LeetCode username from session token');

        console.log("Username", username);

        let hasNext = true;
        let offset = 0;
        const limit = 20;

        while (hasNext) {
            const url = `https://leetcode.com/api/submissions/?offset=${offset}&limit=${limit}`;

            const res = await axios.get(url, {
                headers: {
                    Cookie: `LEETCODE_SESSION=${sessionToken}`
                }
            });

            if (res.status !== 200 || !res.data.submissions_dump) {
                throw new ApiError(400, `Failed to fetch submissions: ${res.status}`);
            }

            const chunkSubmissions = res.data.submissions_dump;
            hasNext = res.data.has_next;
            offset += limit;

            await LeetCodeService.saveSubmissions(userId, chunkSubmissions);

            try {
                onProgress?.(res.data.submissions_dump?.length || 0);
            } catch (progressErr) {
                console.error("Progress callback error:", progressErr);
            }

            // Wait to prevent rate limiting
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    };

    public syncHeatmap = async (userId: string, sessionToken: string): Promise<void> => {
        const username = await LeetCodeService.fetchUsernameFromSession(sessionToken);

        if (!username) throw new ApiError(404, 'Unable to get LeetCode username from session token');

        const payload = getUserHeatmapPayload(username);

        const response = await axios.post('https://leetcode.com/graphql',
            payload, {
            headers: {
                'Content-Type': 'application/json',
                Cookie: `LEETCODE_SESSION=${sessionToken}`,
            }
        })

        const data = response?.data?.data?.matchedUser?.userCalendar;

        const parsedHeatmap = {
            activeYears: data?.activeYears,
            streak: data?.streak,
            totalActiveDays: data?.totalActiveDays,
            dccBadges: data?.dccBadges,
            submissionCalendar: data?.submissionCalendar,
            userId,
        };

        await heatmap.findOneAndUpdate(
            { userId },
            parsedHeatmap,
            { new: true, upsert: true }
        );
    }

    public getLeetcodeSubmissions = async (
        userId: string,
        filters: any,
        limit: number,
        skip: number
    ) => {
        const finalFilters: Record<string, any> = { userId: new mongoose.Types.ObjectId(userId) };

        // Apply filters if present
        if (filters && typeof filters === 'object') {
            for (const key in filters) {
                if (filters[key] !== undefined && filters[key] !== '') {
                    finalFilters[key] = filters[key];
                }
            }
        }

        // Define pipeline stages explicitly
        const pipeline: PipelineStage[] = [
            { $match: finalFilters },
            { $sort: { timestamp: -1 } }, // Sort recent first
            { $skip: skip },
            { $limit: limit }
        ];

        const [total, submissions] = await Promise.all([
            LeetCodeSubmission.countDocuments(finalFilters),
            LeetCodeSubmission.aggregate(pipeline)
        ]);

        return { total, submissions };
    };

    public syncAllProblems = async () => {
        let skip = 0;
        let hasMore = true;

        while (hasMore) {
            const payload = getLeetcodePayload(skip);
            const res = await axios.post(
                'https://leetcode.com/graphql/',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Referer': 'https://leetcode.com/problemset/all/',
                        'Origin': 'https://leetcode.com',
                    }
                }
            );

            const { questions, hasMore: more } = res.data.data.problemsetQuestionListV2;

            for (const question of questions) {
                await allProblems.updateOne(
                    { id: question.id },
                    { $set: question },
                    { upsert: true }
                );
            }

            console.log(`Fetched ${questions.length} problems (skip: ${skip})`);

            skip += 100;
            hasMore = more;
        }
    }

    public getLeetcodeProblems = async (filters: any, sort: any, limit: any, skip: any) => {
        let sortPipeline: any[] = [];

        if ('questionFrontendId' in sort) {
            const order = sort['questionFrontendId'];
            sortPipeline.push({
                $addFields: {
                    questionFrontendIdInt: {
                        $convert: {
                            input: "$questionFrontendId",
                            to: "int",
                            onError: null,
                            onNull: null
                        }
                    }
                }
            });
            sortPipeline.push({ $sort: { questionFrontendIdInt: order } });
        } else {
            sortPipeline.push({ $sort: sort });
        }

        const pipeline = [
            { $match: filters },
            ...sortPipeline,
            { $skip: skip },
            { $limit: limit }
        ];

        const [total, leetcodeProblems] = await Promise.all(
            [
                allProblems.countDocuments(filters),
                allProblems.aggregate(pipeline)
            ]
        );

        return { total, leetcodeProblems: leetcodeProblems };
    }

    public syncLeetcodeStats = async (userId: string, leetcodeSession: string) => {
        console.log("inside userStats");
        const username = await LeetCodeService.fetchUsernameFromSession(leetcodeSession);

        if (!username) {
            throw new ApiError(400, 'Unable to fetch username from LeetCode session.');
        }

        const payload = getLeetcodeStatsPayload(username);

        const response = await axios.post('https://leetcode.com/graphql',
            payload, {
            headers: {
                'Content-Type': 'application/json',
                Cookie: `LEETCODE_SESSION=${leetcodeSession}`,
            }
        })

        const data = response.data.data;
        const stats = data.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
        const streak = data.matchedUser?.userCalendar?.streak || 0;

        const parsedStats = {
            totalSolved: stats.find((x: any) => x.difficulty === 'All')?.count || 0,
            easySolved: stats.find((x: any) => x.difficulty === 'Easy')?.count || 0,
            mediumSolved: stats.find((x: any) => x.difficulty === 'Medium')?.count || 0,
            hardSolved: stats.find((x: any) => x.difficulty === 'Hard')?.count || 0,
            acceptanceRate: parseFloat((Math.random() * (80 - 40) + 40).toFixed(1)), // placeholder
            streak,
            ranking: 0,
            userId,
            updatedAt: new Date()
        };

        const updatedStats = await userStats.findOneAndUpdate(
            { userId },
            parsedStats,
            { new: true, upsert: true }
        );

        console.log("updated stats");

        return updatedStats;
    }

    public getLeetcodeStats = async (userId: string) => {
        const stats = await userStats.findOne({ userId });
        return stats;
    }

    public getLeetcodeHeatmap = async (userId: string) => {
        const heatmapData = await heatmap.findOne({ userId });
        return heatmapData;
    }

    public assignTopicsToSubmissions = async (userId: string) => {
        // 1️⃣ Fetch all submissions for the user
        const submissions = await LeetCodeSubmission.find({ userId });

        if (!submissions.length) {
            return { updated: 0, skipped: 0, total: 0 };
        }

        // 2️⃣ Fetch all problems ONCE
        const allProblemsList = await allProblems.find({});
        const problemsMap = new Map(allProblemsList.map(p => [p.titleSlug, p]));

        let updated = 0;
        let skipped = 0;
        const bulkOps: any[] = [];

        for (const submission of submissions) {
            // 🕵️ Confirm you have the right field name here!
            const problemSlug = submission.titleSlug;

            if (!problemSlug) {
                console.warn(`Skipping submission ${submission._id} — no titleSlug/problemSlug`);
                skipped++;
                continue;
            }

            if (submission.topicTags && submission.topicTags.length > 0) {
                // Already tagged
                skipped++;
                continue;
            }

            const problem = problemsMap.get(problemSlug);

            if (!problem) {
                console.warn(`No problem found for slug: ${problemSlug}`);
                skipped++;
                continue;
            }

            if (Array.isArray(problem.topicTags) && problem.topicTags.length > 0) {
                const topics = problem.topicTags.map(tag => tag.slug || tag.name);
                bulkOps.push({
                    updateOne: {
                        filter: { _id: submission._id },
                        update: { $set: { topicTags: topics } }
                    }
                });
                updated++;
            } else {
                console.warn(`No topicTags found for problem: ${problemSlug}`);
                skipped++;
            }
        }

        if (bulkOps.length > 0) {
            const result = await LeetCodeSubmission.bulkWrite(bulkOps);
            console.log(`bulkWrite result:`, JSON.stringify(result, null, 2));
        } else {
            console.warn("No operations to bulkWrite.");
        }

        return { updated, skipped, total: submissions.length };
    };

    public getSubmissionsByTopic = async (userId: string, topic: string, limit: number) => {
        const submissions = LeetCodeSubmission.find({
            userId,
            topicTags: topic
        }).sort({ timeStamp: -1}).limit(limit);

        return submissions;
    }

}
