import {
	Request,
	Response,
	NextFunction,
} from 'express';
import type { HandledFunction } from '../types/controller';

/**
 * Wrapper function for global error handling.
 * @param fn asynchronous function to be wrapped and error handled.
 * @returns Promise<...>
 */
const asyncWrapper =
	(fn: HandledFunction) => (req: Request, res: Response, next: NextFunction) =>
		Promise.resolve(fn(req, res, next)).catch(next);

export default asyncWrapper;