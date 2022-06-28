import { Express } from 'express';
import { body, param, query } from 'express-validator';
import create from './create';
import getById from './getById';
import get from './get';
import Auth from '../../common/auth';
import Validators from '../../common/validators';

const basePath = '/api/v1/posts';

const postsV1 = (app: Express) => {
	app.get(
		basePath,
		query('pageNum').isInt({ min: 0 }).optional(),
		query('pageSize').isInt({ min: 1, max: 500 }).optional(),
		get,
	);
	app.get(
		`${basePath}/:id`,
		param('id').custom(Validators.objectId),
		getById,
	);

	app.put(
		basePath,
		body('title').isLength({ max: 500 })
			.trim()
			.escape()
			.notEmpty(),
		body('description').isLength({ max: 200 })
			.trim()
			.escape()
			.notEmpty(),
		body('image').isURL({ protocols: ['http', 'https'] }),
		body('imageLabel').isLength({ max: 50 })
			.trim()
			.escape()
			.notEmpty(),
		body('body').notEmpty(),
		Auth.auth(['admin']),
		create,
	);

	return app;
};

export default postsV1;
