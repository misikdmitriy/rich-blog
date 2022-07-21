import express from 'express';

const auth = (
	allowedRoles: string[],
) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.isUnauthenticated()) {
		return res.status(401).json({ errors: ['authentication required'] });
	}

	if (!allowedRoles.some((ar) => req.user?.roles.includes(ar))) {
		return res.status(403).json({ errors: [`${allowedRoles.map((ar) => `'${ar}'`).join(', ')} role required`] });
	}

	return next();
};

export default auth;
