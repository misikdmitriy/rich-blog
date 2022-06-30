import { ObjectId } from 'mongodb';
import { query } from '../../db';
import { PostDocument } from '../../types/post';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

interface FilterPostsInput {
	id?: string
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
) => {
	const filter: Record<string, unknown> = {};

	if (filterArgs?.id) {
		filter._id = new ObjectId(filterArgs.id);
	}

	const cursor = await query<PostDocument>(
		POSTS_COLLECTION,
		filter,
	);
	const docs = await cursor.sort({ createdDate: -1 })
		.skip(Number(pagination?.skip || 0))
		.limit(Number(pagination?.take || 10))
		.toArray();

	return docs.map((doc) => ({
		id: doc._id,
		...doc,
	}));
};

export default all;
