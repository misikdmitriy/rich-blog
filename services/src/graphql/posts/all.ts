import { query } from '../../db';
import { PostDocument } from '../../types/post';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

const all = async (
	_parent: unknown,
	{ pageNum, pageSize }: { pageNum: number, pageSize: number },
) => {
	const cursor = await query<PostDocument>(POSTS_COLLECTION);
	const docs = await cursor.sort({ createdDate: -1 })
		.skip(Number(pageSize) * Number(pageNum))
		.limit(Number(pageSize))
		.toArray();

	return docs.map((doc) => ({
		id: doc._id,
		title: doc.title,
		description: doc.description,
		image: doc.image,
		imageLabel: doc.imageLabel,
		createdDate: doc.createdDate,
	}));
};

export default all;
