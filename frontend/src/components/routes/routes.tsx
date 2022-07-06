import React from 'react';
import CreatePostPage from '../createPost/CreatePostPage';
import FeedPage from '../feed/FeedPage';
import NotFound from '../notfound/NotFound';
import PostPage from '../post/PostPage';

export type AppRoute = {
	path: string,
	element: React.ReactNode,
	name: string
};

export type AppRouteWithChildren = AppRoute & {
	children: (AppRoute | AppRouteWithChildren)[]
}

export const hasChildren = (
	appRoute: AppRoute | AppRouteWithChildren,
): appRoute is AppRouteWithChildren => !!(appRoute as AppRouteWithChildren).children?.length;

export default [
	{
		path: '/',
		element: <FeedPage />,
		name: 'Home',
		children: [
			{
				path: '/posts/create',
				element: <CreatePostPage />,
				name: 'Create Post',
			},
			{
				path: '/posts/:shortUrl',
				element: <PostPage />,
				name: 'Post',
			},
			{
				path: '*',
				element: <NotFound />,
				name: 'Not Found',
			},
		],
	},
] as [AppRouteWithChildren];
