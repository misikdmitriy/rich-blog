import {
	GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString,
} from 'graphql';
import DateTimeScalar from '../scalars/date-time';
import all from './all';
import get from './get';

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

export default {
	queries: {
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
			resolve: all,
		},
		post: {
			type: Post,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
				},
			},
			resolve: get,
		},
	},
};
