import { ObjectId } from 'mongodb';
import { putObject } from '../../aws/s3';
import { findOneAndUpdate } from '../../db';
import { AppContext } from '../../types/app';
import { PostNoContent } from '../../types/post';
import { requireAuth } from '../common/auth';
import { getKeyByPostId } from './common';

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
	CONTENT_BUCKET = '',
} = process.env;

const create = async (
	_parent: unknown,
	{
		id,
		post: {
			shortUrl, title, content, description, image, imageLabel, availableToUsers,
		},
	}: { id: string, post: UpdateInput },
	context: AppContext,
) => {
	requireAuth(context, 'admin');

	const post: Partial<PostNoContent> = {
		title,
		shortUrl,
		description,
		image,
		imageLabel,
		updatedDate: new Date(),
		updatedBy: context.user!.id,
	};

	if (availableToUsers) {
		post.availableFor = ['admin', 'user'];
	}

	const result = await findOneAndUpdate(POSTS_COLLECTION, post, { _id: new ObjectId(id) });

	if (!result.ok || !result.value) {
		throw new Error('error on update');
	}

	const s3Response = await putObject(
		CONTENT_BUCKET,
		getKeyByPostId(result.value!._id),
		JSON.stringify(content),
	);

	if (s3Response.$response.error) {
		throw new Error('error on content update');
	}

	return { id: result.value!._id, ...post };
};

export default create;
