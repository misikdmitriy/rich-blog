import React from 'react';
import { Container } from '@mui/material';
import AppRoutes from './components/routes/AppRoutes';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

const App = () => (
	<>
		<header><Header sections={[]} title="Blog" /></header>
		<main>
			<Container maxWidth="lg"><AppRoutes /></Container>
		</main>
		<footer><Footer title="Blog" description="Interesting" /></footer>
	</>
);

export default App;
