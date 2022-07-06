import {
	Typography, Toolbar, Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import LoginDialog from '../login/LoginDialog';
import { Me } from '../../graphql/me';

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
	const { title } = props;

	const {
		data: {
			me: {
				isAuthenticated = false,
			} = {},
		} = {}, loading,
	} = useQuery<{me: {isAuthenticated: boolean}}>(Me);

	const [signInOpen, setSignInOpen] = useState<boolean>(false);

	const openSignIn = () => setSignInOpen(true);
	const closeSignIn = () => setSignInOpen(false);

	const signOut = () => {
		window.location.href = `/api/v1/auth/logout?returnTo=${window.location.href}`;
	};

	return (
		<Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
			<Typography
				component="h2"
				variant="h5"
				color="inherit"
				align="center"
				noWrap
				sx={{ flex: 1 }}
			>
				{title}
			</Typography>
			{!loading && !isAuthenticated && (
				<Button variant="outlined" size="small" onClick={openSignIn}>
					Sign In
				</Button>
			)}
			{!loading && isAuthenticated && (
				<Button variant="outlined" size="small" onClick={signOut}>
					Sign Out
				</Button>
			)}
			<LoginDialog title="Sign In" open={signInOpen} close={closeSignIn} />
		</Toolbar>
	);
};

export default Header;
