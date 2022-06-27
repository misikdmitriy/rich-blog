import { Express } from 'express';
import googleV1 from './google';
import logout from './logout';
import me from './me';

const basePath = '/api/v1/auth';

const authV1 = (app: Express) => {
	app.get(`${basePath}/me`, me);
	app.get(`${basePath}/logout`, logout);

	return googleV1(app);
};

export default authV1;
