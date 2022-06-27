import express from 'express';
import passport from 'passport';

const callback = (errorPath: string, successPath: string) => (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const returnTo = req.query.state ? String(req.query.state) : successPath;
	passport.authenticate('google', { failureRedirect: errorPath, successRedirect: returnTo })(req, res, next);
};

export default callback;
