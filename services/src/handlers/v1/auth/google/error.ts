import express from 'express';

const error = (_req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.status(500).json({ errors: ['Unknown error during authentication'] });
	next();
};

export default error;
