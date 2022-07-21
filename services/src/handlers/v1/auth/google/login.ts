import express from 'express';
import passport from 'passport';

const login = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const returnTo = req.query.returnTo ? String(req.query.returnTo) : undefined;
	passport.authenticate('google', { state: returnTo })(req, res, next);
};

export default login;
