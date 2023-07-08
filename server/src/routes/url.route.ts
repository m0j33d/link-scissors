import { Router } from 'express';
import { createShortUrl, getShortUrls, generateQRCode } from '../controllers/url.controller';

const router = Router();
router
	.route('/')
	.get(getShortUrls)
	.post(createShortUrl);

router
	.route("/qrcode")
	.post(generateQRCode);


export { router as shortnerRoutes };