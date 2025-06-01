// controllers/health.controller.ts
import { Request, Response } from 'express';

export const healthCheck = (_req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is alive',
        timestamp: new Date().toISOString(),
    });
};
