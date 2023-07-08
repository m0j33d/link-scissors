import { Router, Request, Response } from 'express';

const router = Router();

router.route('*').all((req: Request, res: Response) => {
	res.status(404).send("Route Not Found")
});

export { router as NotFoundRoute };