import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Copyright = () => (
	<Typography variant="body2" color="text.secondary" align="center">
		{'Copyright © '}
		<Link to="/">
			Blog
		</Link>
		{' '}
		{new Date().getFullYear()}
		.
	</Typography>
);

interface FooterProps {
	description: string,
	title: string
}

const Footer = (props: FooterProps) => {
	const { description, title } = props;

	return (
		<Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
			<Container maxWidth="lg">
				<Typography variant="h6" align="center" gutterBottom>
					{title}
				</Typography>
				<Typography
					variant="subtitle1"
					align="center"
					color="text.secondary"
					component="p"
				>
					{description}
				</Typography>
				<Copyright />
			</Container>
		</Box>
	);
};

export default Footer;
