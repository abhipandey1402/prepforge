import { Router } from 'express';
import { getAllAIInsights, getTopicWiseAIInsights } from '../controllers/agent.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router: Router = Router();

router.route('/get-insights-by-topic').post(verifyJWT, getTopicWiseAIInsights);
router.route('/get-insights').get(verifyJWT, getAllAIInsights);

export default router;
