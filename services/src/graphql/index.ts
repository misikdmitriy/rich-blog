import {
	GraphQLInt,
	GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema,
} from 'graphql';
import { query } from '../db';
import { PostDocument } from '../types/post';
import Post from './posts/posts';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		posts: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
			args: {
				pageNum: {
					type: new GraphQLNonNull(GraphQLInt),
					defaultValue: 0,
				},
				pageSize: {
					type: new GraphQLNonNull(GraphQLInt),
					defaultValue: 50,
				},
			},
			resolve: async (_parent, { pageNum, pageSize }) => {
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
	}),
});

const RichBlogSchema = new GraphQLSchema({
	query: Query,
});

export default RichBlogSchema;
