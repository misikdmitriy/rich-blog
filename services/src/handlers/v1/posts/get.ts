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

		const projection = {
			title: 1, description: 1, image: 1, imageLabel: 1, createdDate: 1,
		};

		const cursor = await query<PostDocument>(POSTS_COLLECTION, {}, { projection });
		const docs = await cursor.sort({ createdDate: -1 })
			.skip(Number(pageSize) * Number(pageNum))
			.limit(Number(pageSize))
			.toArray();

		return res.status(200).json({
			docs: docs.map((doc) => ({
				id: doc._id,
				title: doc.title,
				description: doc.description,
				image: doc.image,
				imageLabel: doc.imageLabel,
				createdDate: doc.createdDate,
			})),
		});
	} catch (err) {
		return res.status(500).json({ errors: ['Unknown error'] });
	} finally {
		next();
	}
};

export default get;
