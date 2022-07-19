import { ObjectId } from 'mongodb';
import { deleteOne } from '../../db/mongo';
import { AppContext } from '../../types/app';
import { requireAuth } from '../common/auth';

const {
	POSTS_COLLECTION = 'posts',
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

	return { success: !!result.deletedCount };
};

export default deletePost;
