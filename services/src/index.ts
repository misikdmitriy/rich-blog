import './config-enrich';
import express from 'express';
import { body, param, query } from 'express-validator';
import PostsV1 from './handlers/v1/posts';

const app = express();
app.use(express.json());

const port = Number(process.env.PORT || 3000);

app.get(
	'/v1/posts',
	query('pageNum').isInt({ min: 0 }).optional(),
	query('pageSize').isInt({ min: 1, max: 500 }).optional(),
	PostsV1.get,
);
app.get('/v1/posts/:id', param('id').notEmpty(), PostsV1.getById);

app.put(
	'/v1/posts',
	body('name').isLength({ max: 500 }).trim().escape()
		.notEmpty(),
	body('body').notEmpty(),
	PostsV1.create,
);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
