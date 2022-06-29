import {
	GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString,
} from 'graphql';
import DateTimeScalar from '../scalars/date-time';

const Post = new GraphQLObjectType({
	name: 'Post',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
		title: {
			type: new GraphQLNonNull(GraphQLString),
		},
		description: {
			type: new GraphQLNonNull(GraphQLString),
		},
		image: {
			type: new GraphQLNonNull(GraphQLString),
		},
		imageLabel: {
			type: new GraphQLNonNull(GraphQLString),
		},
		body: {
			type: new GraphQLNonNull(GraphQLString),
		},
		createdDate: {
			type: new GraphQLNonNull(DateTimeScalar),
		},
		createdBy: {
			type: new GraphQLNonNull(GraphQLString),
		},
	},
});

export default Post;
