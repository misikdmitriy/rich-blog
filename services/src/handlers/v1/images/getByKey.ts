import { S3 } from 'aws-sdk';
import express from 'express';
import { validationResult } from 'express-validator';
import { getObject } from '../../../aws/s3';

const {
	IMAGES_BUCKET = '',
} = process.env;

const getByKey = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { key } = req.params;

		const response = await getObject(IMAGES_BUCKET, key);

		if (response.$response.error) {
			return res.status(500).json({ errors: ['error during file request'] });
		}

		const {
			ContentType = 'application/octet-stream', Body, ContentEncoding,
		} = response;

		return res.status(200)
			.contentType(ContentType)
			.header('content-encoding', ContentEncoding)
			.send(Body);
	} catch (err) {
		return res.status(500).json({ errors: ['Unknown error'] });
	} finally {
		next();
	}
};

export default getByKey;
