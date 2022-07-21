import React from 'react';
import {
	Button,
	Box,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
	<Box
		display="flex"
		alignItems="stretch"
		justifyContent="center"
		sx={{
			flexDirection: 'column',
			height: '75vh',
		}}
	>
		<Box>
			<Typography align="center" variant="h2" component="h2" sx={{ textTransform: 'uppercase' }}>
				Oops!
			</Typography>
		</Box>
		<Box>
			<Typography align="center" variant="subtitle1" component="h6">
				Error 404: Page Not Found
			</Typography>
		</Box>
		<Box sx={{ m: 2 }} display="flex" justifyContent="center">
			<Link to="/" style={{ textDecoration: 'none' }}>
				<Button variant="outlined">Back To Main</Button>
			</Link>
		</Box>
	</Box>
);

export default NotFound;
