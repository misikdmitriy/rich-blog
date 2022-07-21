import express from 'express';

const logout = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const { returnTo = '/api/v1/auth/me' } = req.query;

	req.logOut({ keepSessionInfo: true }, (err) => {
		if (err) {
			res.status(500).json({ errors: ['error during logout'] });
		} else {
			res.redirect(String(returnTo));
		}

		next();
	});
};

export default logout;
