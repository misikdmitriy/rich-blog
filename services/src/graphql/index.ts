import Posts from './posts/posts';
import Me from './me';
import DateTime from './scalars/date-time';

export default {
	Query: {
		...Posts.queries,
		...Me.queries,
	},
	Mutation: {
		...Posts.mutations,
	},
	Post: Posts.Post,
	DateTime,
};
