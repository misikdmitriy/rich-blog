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

		const doc = await queryOne<PostDocument>(POSTS_COLLECTION, { _id: new ObjectId(id) });

		if (!doc) {
			return res.status(404).json({ id });
		}

		return res.status(200).json({
			id: doc._id,
			title: doc.title,
			description: doc.description,
			image: doc.image,
			imageLabel: doc.imageLabel,
			createdDate: doc.createdDate,
			body: doc.body,
		});
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
