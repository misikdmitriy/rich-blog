import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import AppRoutes from './components/routes/AppRoutes';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

const App = () => {
	const location = useLocation();
	const cache = useApolloClient();

	useEffect(() => {
		cache.resetStore();
	}, [location]);

	return (
		<>
			<header><Header sections={[]} title="Blog" /></header>
			<main>
				<Container maxWidth="xl">
					<AppRoutes />
				</Container>
			</main>
			<footer><Footer title="Blog" description="Interesting" /></footer>
		</>
	);
};

export default App;
