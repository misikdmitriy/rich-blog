import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePostPage from '../createPost/CreatePostPage';
import FeedPage from '../feed/FeedPage';
import LoginPage from '../login/LoginPage';

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<FeedPage />} />
		<Route path="login" element={<LoginPage />} />
		<Route path="posts">
			<Route path="create" element={<CreatePostPage />} />
		</Route>
		<Route path="*" element={<FeedPage />} />
	</Routes>
);

export default AppRoutes;
