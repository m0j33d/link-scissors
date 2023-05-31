import { Schema, model } from 'mongoose';

interface IUrl {
	full_url: string;
	short_url: string;
	url_id: string;
}

const UrlSchema = new Schema<IUrl>(
	{
		full_url: {
			type: String,
			maxlength: [3000, 'Url provided is too long.'],
			required: true,
		},
		short_url: { type: String, required: true },
		url_id: { type: String, required: true },
	},
	{ timestamps: true }
);

const UrlModel = model('Url', UrlSchema);

export default UrlModel;