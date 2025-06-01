import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller.js';

const healthRouter: Router = Router();

healthRouter.route('/').get(healthCheck);

export default healthRouter;
