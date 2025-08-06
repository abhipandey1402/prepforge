import { Router } from 'express';
import { getTopicWiseAIInsights } from '../controllers/agent.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router: Router = Router();

router.route('/get-insights-by-topic').post(verifyJWT, getTopicWiseAIInsights);

export default router;
