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
		title: doc.title,
		description: doc.description,
		image: doc.image,
		imageLabel: doc.imageLabel,
		createdDate: doc.createdDate,
		body: doc.body,
	} : null;
};

export default get;
