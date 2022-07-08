import posts from './all';
import content from './content';
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
		content,
	},
};
