import { Filter, ObjectId } from 'mongodb';
import { query } from '../../db';
import { AppContext } from '../../types/app';
import { PostDocument } from '../../types/post';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

interface FilterPostsInput {
	id?: string
	shortUrl?: string
}

interface PaginationInput {
	skip: number,
	take: number
}

interface PostsArgs {
	filter?: FilterPostsInput,
	pagination?: PaginationInput
}

const all = async (
	_parent: unknown,
	{ filter: filterArgs, pagination }: PostsArgs,
	{ user }: AppContext,
) => {
	const filter: Filter<PostDocument> = {};

	if (filterArgs?.id) {
		filter._id = new ObjectId(filterArgs.id);
	}

	if (filterArgs?.shortUrl) {
		filter.shortUrl = filterArgs.shortUrl;
	}

	filter.availableFor = { $in: [...new Set([...(user?.roles || []), 'user'])] };

	const cursor = await query<PostDocument>(
		POSTS_COLLECTION,
		filter,
	);

	const { skip = 0, take = 10 } = pagination || {};

	const fetchCursor = cursor.sort({ createdDate: -1 })
		.skip(skip)
		.limit(take > 100 ? 100 : take)
		.map((doc) => ({
			id: doc._id,
			...doc,
		}));

	const posts = await fetchCursor.toArray();

	return {
		posts,
		hasNext: posts.length === take,
	};
};

export default all;
