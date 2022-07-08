import posts from './all';
import body from './body';
import createPost from './create';
import deletePost from './delete';

export default {
	queries: {
		posts,
	},
	mutations: {
		createPost,
		deletePost,
	},
	Post: {
		body,
	},
};
