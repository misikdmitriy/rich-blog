import { S3 } from 'aws-sdk';
import express from 'express';
import { validationResult } from 'express-validator';
import { listItems } from '../../../aws/s3';

const {
	IMAGES_BUCKET = '',
} = process.env;

const get = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { startAfter, pageSize = 100 } = req.query;

		const response = await listItems(
			IMAGES_BUCKET,
			Number(pageSize),
			startAfter ? String(startAfter) : undefined,
		);

		if (response.$response.error) {
			return res.status(500).json({ errors: ['error during files request'] });
		}

		const toLink = ({ Key }: S3.Object) => `https://${IMAGES_BUCKET}.s3.amazonaws.com/${Key}`;
		const images = response.Contents?.map((obj) => ({ key: obj.Key, link: toLink(obj) }));

		return res.status(200).json({ images: images || [] });
	} catch (err) {
		return res.status(500).json({ errors: ['Unknown error'] });
	} finally {
		next();
	}
};

export default get;
