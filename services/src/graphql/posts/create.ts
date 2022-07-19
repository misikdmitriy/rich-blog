import { insert } from '../../db';
import { AppContext } from '../../types/app';
import { Post } from '../../types/post';
import { requireAuth } from '../common/auth';

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

	const post: Post = {
		title,
		shortUrl,
		description,
		content,
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

	return { id: result.insertedId, ...post };
};

export default create;
