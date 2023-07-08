import { Request as IReq, Response as IRes } from 'express';
import UrlModel from '../models/url.model';
import BaseError from '../error/base-error';
import * as validUrl from 'valid-url';
import * as dotenv from 'dotenv';
import shortId from 'shortid';
import QRCode from "qrcode";
import Cache from "../config/redis";


// load environment variables
dotenv.config();

export const getShortUrls = async (req: IReq, res: IRes): Promise<void | IRes> => {
	const shortUrls = await UrlModel.find();
	res.status(200).json(shortUrls);
};

export const createShortUrl = async (req: IReq, res: IRes): Promise<void | IRes> => {
	const { url, custom_alias } = req.body;
	const baseUrl = process.env.BASE_URL || '';

	if (!validUrl.isUri(baseUrl))
		throw new BaseError('Invalid base url, check and try again.', 400);
	if (!validUrl.isUri(url))
		throw new BaseError('Invalid url, check and try again.', 400);

	const urlsCount = await UrlModel.count({ short_url: url });
	if (urlsCount !== 0)
		throw new BaseError("Please don't submit already shortened urls", 400);

	const savedUrl = await UrlModel.findOne({ full_url: url });
	if (savedUrl) throw new BaseError('Url already shortned', 409);

	const url_id = custom_alias ?? shortId.generate();
	const short_url = baseUrl + '/s/' + url_id;
	const newShortUrl = await UrlModel.create({ full_url: url, url_id, short_url });
	
    await Cache.redis?.set(`url:${newShortUrl.custom_alias}`, JSON.stringify(url));

	res.status(201).json(newShortUrl);
};

export const generateQRCode = async (req: IReq, res: IRes): Promise<void | IRes> => {
	const { url } = req.body as { url: string };
  
	QRCode.toDataURL(
	url,
	  {
		errorCorrectionLevel: "H",
		type: "image/png",
		margin: 4,
		scale: 4,
	  },
	  (err, dataURI) => {
		if (err) throw new BaseError("Error generating QR code, try again!", 500);

		return res
		  .status(201)
		  .json({ status: "success", data: { url: dataURI } });
	  }
	);
}
