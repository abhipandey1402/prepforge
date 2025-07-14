import { Router } from 'express';
import { syncSubmissions, getLeetcodeProblems, getLeetcodeSubmissions, syncAllProblems, syncLeetcodeStats, getLeetcodeStats, saveLeetcodeSession, syncHeatmap, getLeetcodeHeatmap, assignTopicsToSubmissions, getSubmissionsByTopic } from '../controllers/leetcode.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router: Router = Router();

// Route: GET /api/leetcode/session
router.route('/session-token').post(verifyJWT, saveLeetcodeSession);
router.route('/submissions/sync').post(verifyJWT, syncSubmissions);
router.route('/problems/sync').post(syncAllProblems);
router.route('/userStats/sync').post(verifyJWT, syncLeetcodeStats);
router.route('/heatmap/sync').get(verifyJWT, syncHeatmap);
router.route('/assign-topics').get(verifyJWT, assignTopicsToSubmissions);

router.route('/submissions').get(verifyJWT, getLeetcodeSubmissions);
router.route('/problems').get(getLeetcodeProblems);
router.route('/userStats').get(verifyJWT, getLeetcodeStats);
router.route('/heatmap').get(verifyJWT, getLeetcodeHeatmap);
router.route('/get-submissions-by-topic').post(verifyJWT, getSubmissionsByTopic);

export default router;
