import express from 'express';
import { validationResult } from 'express-validator';
import { PostDocument } from '../../../types/post';
import { query } from '../../../db';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

const get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { pageNum = 0, pageSize = 500 } = req.query;

		const cursor = await query<PostDocument>(POSTS_COLLECTION);
		const docs = await cursor.sort({ createdDate: -1 })
			.skip(Number(pageSize) * Number(pageNum))
			.limit(Number(pageSize))
			.toArray();

		return res.status(200).json({ docs });
	} catch (err) {
		return res.status(500).json({ errors: ['Unknown error'] });
	} finally {
		next();
	}
};

export default get;
