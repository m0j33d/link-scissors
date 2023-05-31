import { Request, Response } from 'express';
import UrlModel from '../models/url.model';
import BaseError from '../error/base-error';

const redirect = async (req: Request, res: Response): Promise<void | Response> => {
	const { code } = req.params;
	const url = await UrlModel.findOne({ url_id: code });
	if (!url) throw new BaseError('Url not found.', 404);

	res.status(200).redirect(url.full_url);
};

export { redirect };