import posts from './all';
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
};
