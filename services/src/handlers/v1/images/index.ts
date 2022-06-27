import { Express } from 'express';
import { query, param } from 'express-validator';
import get from './get';
import getByKey from './getByKey';

const basePath = '/api/v1/images';

const imagesV1 = (app: Express) => {
	app.get(
		basePath,
		query('startAfter').isString().optional(),
		query('pageSize').isInt({ min: 1, max: 500 }).optional(),
		get,
	);

	app.get(
		`${basePath}/:key`,
		param('key').notEmpty(),
		getByKey,
	);

	return app;
};

export default imagesV1;
