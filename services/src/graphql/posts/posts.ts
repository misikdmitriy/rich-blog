import posts from './all';
import body from './body';
import createPost from './create';

export default {
	queries: {
		posts,
	},
	mutations: {
		createPost,
	},
	Post: {
		body,
	},
};
