import posts from './all';
import body from './body';
import createPost from './create';
import post from './get';

export default {
	queries: {
		posts,
		post,
	},
	mutations: {
		createPost,
	},
	Post: {
		body,
	},
};
