import { putObject } from '../../aws/s3';
import { insert } from '../../db';
import { AppContext } from '../../types/app';
import { PostNoContent } from '../../types/post';
import { requireAuth } from '../common/auth';
import { getKeyByPostId } from './common';

interface CreateInput {
	shortUrl: string,
    title: string,
    content: Record<string, unknown>,
    description: string,
    image: string,
    imageLabel: string,
}

const {
	POSTS_COLLECTION = 'posts',
	CONTENT_BUCKET = '',
} = process.env;

const create = async (
	_parent: unknown,
	{
		post: {
			shortUrl, title, content, description, image, imageLabel,
		},
	}: { post: CreateInput },
	context: AppContext,
) => {
	requireAuth(context, 'admin');

	const post: PostNoContent = {
		title,
		shortUrl,
		description,
		image,
		imageLabel,
		createdDate: new Date(),
		createdBy: context.user!.id,
		availableFor: [...new Set([...context.user!.roles, 'admin'])],
	};

	const result = await insert(POSTS_COLLECTION, post);

	if (!result.acknowledged || !result.insertedId) {
		throw new Error('error on save');
	}

	const s3Response = await putObject(
		CONTENT_BUCKET,
		getKeyByPostId(result.insertedId),
		JSON.stringify(content),
	);

	if (s3Response.$response.error) {
		throw new Error('error on content save');
	}

	return { id: result.insertedId, ...post };
};

export default create;
