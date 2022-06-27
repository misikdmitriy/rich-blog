import { Express } from 'express';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';
import success from './success';
import error from './error';
import { verify } from './verify';
import login from './login';
import callback from './callback';

const {
	BASE_PATH, PORT = 80, GOOGLE_CLIENT_ID = '', GOOGLE_CLIENT_SECRET = '',
} = process.env;

const basePath = '/api/v1/auth/google';

const googleV1 = (app: Express) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET,
				callbackURL:
					`${BASE_PATH}:${PORT}${basePath}/callback`,
				passReqToCallback: true,
				scope: ['profile', 'email'],
			},
			verify,
		),
	);

	app.get(basePath, login);

	const successPath = `${basePath}/success`;
	const errorPath = `${basePath}/error`;

	app.get(
		`${basePath}/callback`,
		callback(errorPath, successPath),
	);

	app.get(successPath, success);
	app.get(errorPath, error);

	return app;
};

export default googleV1;
