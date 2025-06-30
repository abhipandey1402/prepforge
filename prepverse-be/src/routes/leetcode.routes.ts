import { Router } from 'express';
import { fetchLeetCodeSession, syncSubmissions, getLeetcodeProblems, getLeetcodeSubmissions, syncAllProblems, syncLeetcodeStats, getLeetcodeStats, saveLeetcodeSession } from '../controllers/leetcode.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router: Router = Router();

// Route: GET /api/leetcode/session
router.route('/session-token').get(verifyJWT, fetchLeetCodeSession);
router.route('/session-token').post(verifyJWT, saveLeetcodeSession);
router.route('/submissions/sync').post(verifyJWT, syncSubmissions);
router.route('/problems/sync').post(syncAllProblems);
router.route('/userStats/sync').post(verifyJWT, syncLeetcodeStats);

router.route('/submissions').get(verifyJWT, getLeetcodeSubmissions);
router.route('/problems').get(getLeetcodeProblems);
router.route('/userStats').get(verifyJWT, getLeetcodeStats);


export default router;
