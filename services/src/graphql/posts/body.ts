import { ObjectId } from 'mongodb';
import { getObject } from '../../aws/s3';

const {
	CONTENT_BUCKET = '',
} = process.env;

const body = async (
	{ id }: { id: ObjectId },
) => {
	const response = await getObject(CONTENT_BUCKET, id.toString());

	if (response.$response.error) {
		throw new Error('Cannot get body');
	}

	return response.Body?.toString('utf8');
};

export default body;
