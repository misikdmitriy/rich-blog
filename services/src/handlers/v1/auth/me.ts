import express from 'express';

const me = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.status(200).json({ isAuthenticated: req.isAuthenticated(), ...req.user });
	next();
};

export default me;
