import express, { Application } from 'express';
import server from './utils/server';
import * as dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import { rateLimit } from 'express-rate-limit';
import cookieParser from "cookie-parser";
import path from "path";
import passport from "passport";


import { NotFoundRoute } from './routes/404.route';
import { AuthRoutes } from './routes/auth.route';
import { shortnerRoutes } from './routes/url.route';
import { redirectRoutes } from './routes/redirect.route';

// env config
dotenv.config();
const PORT = process.env.PORT || 3500;

const cors_options: CorsOptions = {
	origin: [
		'http://localhost:3500',
		'http://localhost:3000',
		'http://127.0.0.1:5173',
	],
};
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 1200,
	standardHeaders: true,
	message: "Too many requests from your IP address, please try again later.",
	legacyHeaders: false,
});


const app: Application = express();

// server config
app.use(cors(cors_options));
app.use(limiter);

// Body parsers middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// Initialize passport
app.use(passport.initialize());
require("./middleware/passport");

// routes
app.use('/', redirectRoutes);
app.use('/auth', AuthRoutes);
app.use('/urls/shorten', shortnerRoutes);

// error
app.use(NotFoundRoute);

server(app, PORT, process.env.MONGO_URI || '');
