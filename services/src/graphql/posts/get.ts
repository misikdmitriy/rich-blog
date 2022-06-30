import { ObjectId } from 'mongodb';
import { queryOne } from '../../db';
import { PostDocument } from '../../types/post';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

const get = async (_parent: unknown, { id }: { id: string }) => {
	const doc = await queryOne<PostDocument>(POSTS_COLLECTION, { _id: new ObjectId(id) });

	return doc ? {
		id: doc._id,
		...doc,
	} : null;
};

export default get;
