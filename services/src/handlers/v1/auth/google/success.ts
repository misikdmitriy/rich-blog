import express from 'express';

const success = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { redirectUrl = '/api/v1/auth/me' } = req.query;
	res.redirect(String(redirectUrl));
	next();
};

export default success;
