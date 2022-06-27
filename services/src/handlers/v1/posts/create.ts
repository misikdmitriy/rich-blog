import express from 'express';
import { validationResult } from 'express-validator';
import { Post } from '../../../types/post';
import { insert } from '../../../db';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		if (req.isUnauthenticated()) {
			return res.status(401).json({ errors: ['authentication required'] });
		}

		if (!req.user?.roles.includes('admin')) {
			return res.status(403).json({ errors: ['\'admin\' role required'] });
		}

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, body } = req.body;
		const post: Post = {
			name: String(name),
			body: String(body),
			createdDate: new Date(),
			createdBy: req.user.externalId,
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
