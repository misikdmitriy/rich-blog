import posts from './all';
import createPost from './create';
import deletePost from './delete';
import updatePost from './update';

export default {
	queries: {
		posts,
	},
	mutations: {
		createPost,
		deletePost,
		updatePost,
	},
};
