import express from 'express';
import { validationResult } from 'express-validator';
import { Post } from '../../../types/post';
import { insert } from '../../../db';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			title, body, description, image, imageLabel,
		} = req.body;

		const post: Post = {
			title: String(title),
			body: String(body),
			description: String(description),
			image: String(image),
			imageLabel: String(imageLabel),
			createdDate: new Date(),
			createdBy: req.user!.externalId,
		};

		const result = await insert(POSTS_COLLECTION, post);

		if (!result.acknowledged) {
			return res.status(500).json({ errors: ['Repeat later'] });
		}

		return res.status(201).json({ id: result.insertedId });
	} catch (err) {
		return res.status(500).json({ errors: ['Unknown error'] });
	} finally {
		next();
	}
};

export default create;
