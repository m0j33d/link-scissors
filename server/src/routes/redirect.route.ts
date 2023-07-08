import { Router } from 'express';
import asyncWrapper from '../error/error-handler';
import { redirect } from '../controllers/redirect.controller';

const router = Router();
router.route('/').get((req, res) => {
    res.status(200).json('Elon is active');
});

router.route('/s/:code').get(asyncWrapper(redirect));

export { router as redirectRoutes };