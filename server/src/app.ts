import express, { Application } from 'express';
import server from './utils/server';
import * as dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import { auth } from 'express-openid-connect';
import { rateLimit } from 'express-rate-limit';

import { NotFoundRoute } from './routes/404.route';
import { shortnerRoutes } from './routes/url.route';
import { redirectRoutes } from './routes/redirect.route';

// env config
dotenv.config();
const PORT = process.env.PORT || 3500;

const cors_options: CorsOptions = {
	origin: [
		'http://localhost:3500',
		'http://127.0.0.1:5173',
	],
};
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 1200,
	standardHeaders: true,
	legacyHeaders: false,
});

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.AUTH0_SECRET,
	baseURL: process.env.APP_URL,
	clientID: process.env.AUTH0_CLIENT_ID,
	issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};


const app: Application = express();

// server config
app.use(cors(cors_options));
app.use(limiter);
app.use(express.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// routes
app.use('/', redirectRoutes);
app.use('/urls/shorten', shortnerRoutes);

// error
app.use(NotFoundRoute);

server(app, PORT, process.env.MONGO_URI || '');
