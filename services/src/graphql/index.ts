import { GraphQLList, GraphQLObjectType } from 'graphql';
import { query } from '../db';
import { PostDocument } from '../types/post';
import Post from './posts/posts';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		posts: {
			type: new GraphQLList(Post),
			resolve: async (_parent, args) => {
				const { pageNum, pageSize } = args;

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
			},
		},
	},
});

export default RootQuery;
