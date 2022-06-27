import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FeedPage from '../feed/FeedPage';
import LoginPage from '../login/LoginPage';

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<FeedPage />} />
		<Route path="login" element={<LoginPage />} />
		<Route path="*" element={<FeedPage />} />
	</Routes>
);

export default AppRoutes;
