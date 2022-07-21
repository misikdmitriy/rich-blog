import Posts from './posts/posts';
import Me from './me';
import DateTime from './scalars/date-time';
import JsonObject from './scalars/json';

export default {
	Query: {
		...Posts.queries,
		...Me.queries,
	},
	Mutation: {
		...Posts.mutations,
	},
	DateTime,
	JsonObject,
};
