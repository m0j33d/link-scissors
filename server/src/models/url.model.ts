import { Schema, model } from 'mongoose';

interface IUrl {
	full_url: string;
	short_url: string;
	url_id: string;
	clicks: Number;
	custom_alias: string;
	click_source: Array<String>;
}

const UrlSchema = new Schema<IUrl>(
	{
		full_url: {
			type: String,
			maxlength: [3000, 'Url provided is too long.'],
			required: true,
		},
		short_url: { type: String, required: true },
		custom_alias: { type: String, required: false },
		url_id: { type: String, required: true },
		clicks: { type: Number, default: 0 },
    	click_source: [Array],
	},
	{ timestamps: true }
);

const UrlModel = model('Url', UrlSchema);

export default UrlModel;