import { insert } from '../../db';
import { Post } from '../../types/post';
import { Context } from '../types/context';

interface CreateInput {
    title: string,
    body: string,
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
			title, body, description, image, imageLabel,
		},
	}: { post: CreateInput },
	{ user, isAuthenticated }: Context,
) => {
	if (!isAuthenticated) {
		throw new Error('authentication required');
	}

	if (!user?.roles.includes('admin')) {
		throw new Error('\'admin\' role required');
	}

	const post: Post = {
		title: String(title),
		body: String(body),
		description: String(description),
		image: String(image),
		imageLabel: String(imageLabel),
		createdDate: new Date(),
		createdBy: user.externalId,
	};

	const result = await insert(POSTS_COLLECTION, post);

	if (!result.acknowledged) {
		throw new Error('Error on save');
	}

	return { id: result.insertedId, ...post };
};

export default create;
