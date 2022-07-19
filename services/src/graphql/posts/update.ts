import { ObjectId } from 'mongodb';
import { findOneAndUpdate } from '../../db';
import { AppContext } from '../../types/app';
import { Post } from '../../types/post';
import { requireAuth } from '../common/auth';

interface UpdateInput {
	shortUrl?: string,
    title?: string,
    content?: Record<string, unknown>,
    description?: string,
    image?: string,
    imageLabel?: string,
    availableToUsers?: boolean
}

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

const create = async (
	_parent: unknown,
	{
		id,
		post: { availableToUsers, ...other },
	}: { id: string, post: UpdateInput },
	context: AppContext,
) => {
	requireAuth(context, 'admin');

	const post: Partial<Post> = {
		...other,
		updatedDate: new Date(),
		updatedBy: context.user!.id,
	};

	if (availableToUsers) {
		post.availableFor = ['admin', 'user'];
	}

	const result = await findOneAndUpdate(POSTS_COLLECTION, post, { _id: new ObjectId(id) });

	if (!result.ok) {
		throw new Error('error on update');
	}

	return result.value
		? { success: true, post: { id: result.value!._id, ...post } }
		: { success: false };
};

export default create;
