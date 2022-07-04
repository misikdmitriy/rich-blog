import React from 'react';
import { Container } from '@mui/material';
import AppRoutes from './components/routes/AppRoutes';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

const App = () => (
	<Container maxWidth="xl">
		<header><Header sections={[]} title="Blog" /></header>
		<main>
			<AppRoutes />
		</main>
		<footer><Footer title="Blog" description="Interesting" /></footer>
	</Container>
);

export default App;
