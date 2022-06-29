import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import DateTimeScalar from '../scalars/date-time';

const Post = new GraphQLObjectType({
	name: 'Post',
	fields: {
		id: {
			type: GraphQLID,
		},
		title: {
			type: GraphQLString,
		},
		description: {
			type: GraphQLString,
		},
		image: {
			type: GraphQLString,
		},
		imageLabel: {
			type: GraphQLString,
		},
		body: {
			type: GraphQLString,
		},
		createdDate: {
			type: DateTimeScalar,
		},
		createdBy: {
			type: GraphQLString,
		},
	},
});

export default Post;
