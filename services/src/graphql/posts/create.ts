import { putObject } from '../../aws/s3';
import { insert } from '../../db';
import { AppContext } from '../../types/app';
import { PostNoBody } from '../../types/post';

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
	{ user, isAuthenticated }: AppContext,
) => {
	if (!isAuthenticated) {
		throw new Error('authentication required');
	}

	if (!user?.roles.includes('admin')) {
		throw new Error('\'admin\' role required');
	}

	const post: PostNoBody = {
		title,
		shortUrl,
		description,
		image,
		imageLabel,
		createdDate: new Date(),
		createdBy: user.id,
	};

	const result = await insert(POSTS_COLLECTION, post);

	if (!result.acknowledged || !result.insertedId) {
		throw new Error('Error on save');
	}

	const s3Response = await putObject(CONTENT_BUCKET, result.insertedId.toString(), body);
	if (s3Response.$response.error) {
		throw new Error('Error on body save');
	}

	return { id: result.insertedId, ...post };
};

export default create;
