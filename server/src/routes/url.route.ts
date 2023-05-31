import { Router } from 'express';
import { createShortUrl, getShortUrls } from '../controllers/url.controller';

const router = Router();
router
	.route('/')
	.get(getShortUrls)
	.post(createShortUrl);

export { router as shortnerRoutes };