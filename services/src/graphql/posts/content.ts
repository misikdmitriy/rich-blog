import { ObjectId } from 'mongodb';
import { getObject } from '../../aws/s3';
import { getOrSetAsync } from '../../cache';
import { getKeyByPostId } from './common';

const {
	CONTENT_BUCKET = '',
	CACHE_TTL = '10800',
} = process.env;

const cacheTtl = parseInt(CACHE_TTL, 10);

const content = (
	{ id }: { id: ObjectId },
) => getOrSetAsync(`${id}.content`, async () => {
	const response = await getObject(CONTENT_BUCKET, getKeyByPostId(id));

	if (response.$response.error) {
		throw new Error('cannot get content');
	}

	return response.Body?.toString('utf8');
}, cacheTtl);

export default content;
