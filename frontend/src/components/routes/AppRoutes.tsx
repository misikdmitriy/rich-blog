import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePostPage from '../createPost/CreatePostPage';
import FeedPage from '../feed/FeedPage';
import NotFound from '../notfound/NotFound';

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<FeedPage />} />
		<Route path="posts">
			<Route path="create" element={<CreatePostPage />} />
		</Route>
		<Route path="*" element={<NotFound />} />
	</Routes>
);

export default AppRoutes;
