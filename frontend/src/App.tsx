import React, { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import AppRoutes from './components/routes/AppRoutes';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AppBreadcrumbs from './components/routes/AppBreadcrumbs';
import AppBar from './components/appBar/AppBar';
import BackdropProgress from './components/progress/BackdropProgress';

const App = () => {
	const location = useLocation();
	const cache = useApolloClient();

	useEffect(() => {
		cache.resetStore();
	}, [location]);

	return (
		<AppBar>
			<header><Header title="Blog" /></header>
			<main>
				<Container maxWidth="xl">
					<Box display="flex" sx={{ m: 4, flexDirection: 'column' }}>
						<AppBreadcrumbs>
							<BackdropProgress>
								<AppRoutes />
							</BackdropProgress>
						</AppBreadcrumbs>
					</Box>
				</Container>
			</main>
			<footer><Footer title="Blog" description="Interesting" /></footer>
		</AppBar>
	);
};

export default App;
