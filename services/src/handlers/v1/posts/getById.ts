import express from 'express';
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';
import { PostDocument } from '../../../types/post';
import { queryOne } from '../../../db';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

const getById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id } = req.params;

		const result = await queryOne<PostDocument>(POSTS_COLLECTION, { _id: new ObjectId(id) });

		if (!result) {
			return res.status(404).json({ id });
		}

		return res.status(200).json(result);
	} catch (err) {
		if ((err as Record<string, unknown>).name === 'BSONTypeError') {
			return res.status(400).json({ errors: ['id should be in correct format'] });
		}

		return res.status(500).json({ errors: ['Unknown error'] });
	} finally {
		next();
	}
};

export default getById;
