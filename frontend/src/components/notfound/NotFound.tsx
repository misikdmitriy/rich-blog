import React from 'react';
import {
	Button,
	Grid, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
	<Grid container alignItems="center" justifyContent="center" direction="column" sx={{ height: '60vh' }}>
		<Grid item>
			<Typography align="center" variant="h2" component="h2" sx={{ textTransform: 'uppercase' }}>
				Oops!
			</Typography>
		</Grid>
		<Grid item>
			<Typography align="center" variant="subtitle1" component="h6">
				Error 404: Page Not Found
			</Typography>
		</Grid>
		<Grid item sx={{ marginTop: '1.5em' }}>
			<Link to="/" style={{ textDecoration: 'none' }}>
				<Button variant="outlined">Back To Main</Button>
			</Link>
		</Grid>
	</Grid>
);

export default NotFound;
