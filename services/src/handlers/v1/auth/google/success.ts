import express from 'express';

const success = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { returnTo = '/api/v1/auth/me' } = req.query;
	res.redirect(String(returnTo));
	next();
};

export default success;
