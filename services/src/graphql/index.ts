import Posts from './posts/posts';
import DateTimeScalar from './scalars/date-time';

export default {
	Query: {
		...Posts.queries,
	},
	Mutation: {
		...Posts.mutations,
	},
	Post: Posts.Post,
	DateTime: DateTimeScalar,
};
