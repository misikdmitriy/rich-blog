import { Grid } from '@mui/material';
import React from 'react';
import LoginWithGoogle from './LoginWithGoogle';

const Login = () => (
	<Grid
		container
		spacing={0}
		direction="column"
		alignItems="center"
		justifyContent="center"
		style={{ minHeight: '100vh' }}
	>
		<Grid item xs={6}><LoginWithGoogle /></Grid>
	</Grid>
);

export default Login;
