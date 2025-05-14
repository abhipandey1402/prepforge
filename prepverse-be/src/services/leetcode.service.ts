import { chromium, Page } from 'playwright';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import axios from 'axios'
import { allProblems, LeetCodeSubmission, userStats } from '../models/leetcode.model.js';
import { Types } from 'mongoose';
import { RawSubmission } from '../Interface/leetcode.interface.js';
import { getLeetcodePayload, getLeetcodeStatsPayload } from '../utils/leetcodePayload.js';

export class LeetCodeService {
    private static readonly MAX_WAIT_TIME_MS = 5 * 60 * 1000; // 5 minutes
    private static readonly POLLING_INTERVAL_MS = 2000; // 2 seconds

    public static async waitForManualLogin(page: Page): Promise<boolean> {
        console.log("\n[⏳] Please login manually in the browser window.");
        console.log("[ℹ️] The script will continue once login is detected...");

        const startTime = Date.now();

        while (Date.now() - startTime < LeetCodeService.MAX_WAIT_TIME_MS) {
            const indicators = [
                "div.nav-user-icon",
                "[data-cy='nav-user-icon']",
                "div[class*='user-avatar']",
            ];

            for (const selector of indicators) {
                try {
                    const element = await page.$(selector);
                    if (element) {
                        console.log("\n[✅] Login detected via UI element!");
                        return true;
                    }
                } catch (err) {
                    // Log once, skip the error, continue polling
                    console.warn(`[⚠️] Skipped error while checking selector ${selector}:`, (err as Error).message);
                }
            }

            try {
                const currentUrl = page.url();
                if (!currentUrl.toLowerCase().includes("login")) {
                    console.log("\n[✅] Navigation away from login page detected. Assuming successful login.");
                    return true;
                }
            } catch (err) {
                console.warn("[⚠️] Skipped error while checking URL:", (err as Error).message);
            }

            await new Promise(resolve => setTimeout(resolve, LeetCodeService.POLLING_INTERVAL_MS));
        }

        console.log("\n[❌] Timeout waiting for manual login.");
        return false;
    }

    public async getLeetCodeSession(userId: string): Promise<string | null> {
        console.log("[🔄] Launching browser...");

        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            await page.goto('https://leetcode.com/accounts/login/', { waitUntil: 'domcontentloaded' });

            const loginSuccess = await LeetCodeService.waitForManualLogin(page);

            if (!loginSuccess) {
                return null;
            }

            const cookies = await context.cookies();
            const sessionCookie = cookies.find(cookie => cookie.name === 'LEETCODE_SESSION');

            if (!sessionCookie) {
                console.log("[❌] Failed to retrieve LEETCODE_SESSION token");
                return null;
            }

            // ✅ Save token to the user model
            const user = await User.findById(userId);
            if (!user) {
                throw new ApiError(404, 'User not found');
            }

            user.leetcodeSessionToken = sessionCookie.value;
            await user.save();

            console.log(`[✅] LEETCODE_SESSION token saved to user: ${sessionCookie.value}`);
            return sessionCookie.value;
        } finally {
            await browser.close();
        }
    }

    private static saveSubmissions = async (userId: string | Types.ObjectId, submissions: RawSubmission[]): Promise<void> => {
        console.log("in");
        const submissionIds = submissions.map(sub => sub.id);

        // Get existing submission IDs
        const existingIds = await LeetCodeSubmission
            .find({ userId, submissionId: { $in: submissionIds } })
            .distinct('submissionId');

        // Filter out already existing submissions
        const newSubmissions = submissions.filter(sub => !existingIds.includes(sub.id));
        if (newSubmissions.length === 0) return;

        const formatted = newSubmissions.map((sub): any => ({
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
            flagType: sub.flag_type
        }));

        // Save new submissions and capture inserted documents
        const inserted = await LeetCodeSubmission.insertMany(formatted);

        // Extract MongoDB ObjectIds
        const insertedIds = inserted.map(sub => sub._id);

        await User.updateOne(
            { _id: userId },
            { $addToSet: { leetcodeSubmissions: { $each: insertedIds } } }
        );
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

    public syncSubmissions = async (userId: string, sessionToken: string): Promise<void> => {
        const username = await LeetCodeService.fetchUsernameFromSession(sessionToken);
        if (!username) throw new ApiError(404, 'Unable to get LeetCode username from session token');

        let submissions: any[] = [];
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

            if (res.status !== 200 || !res.data?.submissions_dump) {
                throw new ApiError(400, `Failed to fetch submissions: ${res.status}`);
            }

            console.log(offset);
            submissions.push(...res.data.submissions_dump);
            hasNext = res.data.has_next;
            offset += limit;

            // Wait to prevent rate limiting
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // Save submissions using existing saveSubmissions
        await LeetCodeService.saveSubmissions(userId, submissions);
    };

    public getLeetcodeSubmissions = async (userId: string) => {
        return LeetCodeSubmission.find({ userId }).sort({ timestamp: -1 });
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

    public syncLeetcodeStats = async (leetcodeSession: string) => {
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

        return {
            totalSolved: stats.find((x: any) => x.difficulty === 'All')?.count || 0,
            easySolved: stats.find((x: any) => x.difficulty === 'Easy')?.count || 0,
            mediumSolved: stats.find((x: any) => x.difficulty === 'Medium')?.count || 0,
            hardSolved: stats.find((x: any) => x.difficulty === 'Hard')?.count || 0,
            acceptanceRate: parseFloat((Math.random() * (80 - 40) + 40).toFixed(1)), // placeholder
            streak,
            ranking: 0
        };
    }

    public getLeetcodeStats = async(userId: string) => {
        const stats = await userStats.findOne({userId});
        return stats;
    }
}
