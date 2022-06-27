import { Express } from 'express';
import { body, param, query } from 'express-validator';
import create from './create';
import getById from './getById';
import get from './get';

const basePath = '/api/v1/posts';

const postsV1 = (app: Express) => {
	app.get(
		basePath,
		query('pageNum').isInt({ min: 0 }).optional(),
		query('pageSize').isInt({ min: 1, max: 500 }).optional(),
		get,
	);
	app.get(`${basePath}/:id`, param('id').notEmpty(), getById);

	app.put(
		basePath,
		body('name').isLength({ max: 500 }).trim().escape()
			.notEmpty(),
		body('body').notEmpty(),
		create,
	);

	return app;
};

export default postsV1;
