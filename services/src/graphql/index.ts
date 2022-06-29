import {
	GraphQLObjectType,
	GraphQLSchema,
} from 'graphql';
import PostsQueries from './posts/posts';

const RichBlogSchema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			...PostsQueries.queries,
		}),
	}),
});

export default RichBlogSchema;
