import { Router } from 'express';
import asyncWrapper from '../error/error-handler';
import { redirect } from '../controllers/redirect.controller';

const router = Router();
router.route('/:code').get(asyncWrapper(redirect));

export { router as redirectRoutes };