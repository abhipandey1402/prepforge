import { Router } from 'express';
import { fetchLeetCodeSession, fetchLeetcodeSubmissions, getLeetcodeSubmissions } from '../controllers/leetcode.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router: Router = Router();

// Route: GET /api/leetcode/session
router.route('/session-token').get(verifyJWT, fetchLeetCodeSession);
router.route('/submissions').get(verifyJWT, getLeetcodeSubmissions);
router.route('/fetch-submissions').post(verifyJWT, fetchLeetcodeSubmissions);

export default router;
