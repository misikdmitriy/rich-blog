import { ObjectId } from 'mongodb';
import { deleteObject } from '../../aws/s3';
import { deleteOne } from '../../db/mongo';
import { AppContext } from '../../types/app';
import { requireAuth } from '../common/auth';
import { getKeyByPostId } from './common';

const {
	POSTS_COLLECTION = 'posts',
	CONTENT_BUCKET = '',
} = process.env;

const deletePost = async (
	_parent: unknown,
	{ id }: { id: string },
	context: AppContext,
) => {
	requireAuth(context, 'admin');

	const result = await deleteOne(POSTS_COLLECTION, { _id: new ObjectId(id) });
	if (!result.acknowledged) {
		throw new Error('error on delete');
	}

	const s3Response = await deleteObject(CONTENT_BUCKET, getKeyByPostId(id));
	if (s3Response.$response.error) {
		throw new Error('error on content delete');
	}

	return { success: !!result.deletedCount };
};

export default deletePost;
