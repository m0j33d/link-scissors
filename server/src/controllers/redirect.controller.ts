import { Request, Response } from 'express';
import UrlModel from '../models/url.model';
import BaseError from '../error/base-error';
import Cache from "../config/redis";


const redirect = async (req: Request, res: Response): Promise<void | Response> => {
	const { code } = req.params;
	const url = await UrlModel.findOne({ url_id: code });
	if (!url) throw new BaseError('Url not found.', 404);

	url.clicks = url.clicks.valueOf() + 1;

	const referringSite = req.get("Referer");
    if (referringSite) {
      // Update clicks source
      url.click_source.push(referringSite);
    }

	await url.save();
    // Update Cache
    await Cache.redis?.set(`url:${url.custom_alias}`, JSON.stringify(url));

	res.status(200).redirect(url.full_url);
};


export { redirect };