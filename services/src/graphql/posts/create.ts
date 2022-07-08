import { putObject } from '../../aws/s3';
import { insert } from '../../db';
import { AppContext } from '../../types/app';
import { PostNoBody } from '../../types/post';
import { requireAuth } from '../common/auth';
import { getKeyByPostId } from './common';

interface CreateInput {
	shortUrl: string,
    title: string,
    body: string,
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
			shortUrl, title, body, description, image, imageLabel,
		},
	}: { post: CreateInput },
	context: AppContext,
) => {
	requireAuth(context, 'admin');

	const post: PostNoBody = {
		title,
		shortUrl,
		description,
		image,
		imageLabel,
		createdDate: new Date(),
		createdBy: context.user!.id,
	};

	const result = await insert(POSTS_COLLECTION, post);

	if (!result.acknowledged || !result.insertedId) {
		throw new Error('error on save');
	}

	const s3Response = await putObject(CONTENT_BUCKET, getKeyByPostId(result.insertedId), body);
	if (s3Response.$response.error) {
		throw new Error('error on content save');
	}

	return { id: result.insertedId, ...post };
};

export default create;
