import React, { useState } from 'react';
import {
	Typography,
	Toolbar,
	Button,
	Box,
	Link as OutsideLink,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import LoginDialog from '../login/LoginDialog';
import { Me } from '../../graphql/me';
import { AppUser } from '../../types/user';

interface HeaderProps {
  title: string;
}

interface AuthResult {
	isAuthenticated: boolean,
	user?: AppUser
}

const Header = (props: HeaderProps) => {
	const { title } = props;

	const {
		data: {
			me,
		} = {}, loading,
	} = useQuery<{me: AuthResult}>(Me);

	const { isAuthenticated, user } = me || {};

	const [signInOpen, setSignInOpen] = useState<boolean>(false);

	const openSignIn = () => setSignInOpen(true);
	const closeSignIn = () => setSignInOpen(false);

	const isAdmin = () => user && user.roles && user.roles.indexOf('admin') > -1;

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
			<Box>
				{isAdmin() && (
					<Link
						to="/posts/create"
						style={{ textDecoration: 'none' }}
					>
						<Button
							sx={{ m: 1 }}
							variant="outlined"
							size="small"
							startIcon={<AddIcon />}
							color="success"
						>
							Post
						</Button>
					</Link>

				)}
				{!loading && !isAuthenticated && (
					<Button
						sx={{ m: 1 }}
						variant="outlined"
						size="small"
						onClick={openSignIn}
						color="info"
					>
						Sign In
					</Button>
				)}
				{!loading && isAuthenticated && (
					<OutsideLink
						href={`/api/v1/auth/logout?returnTo=${window.location.href}`}
						sx={{ textDecoration: 'none' }}
					>
						<Button
							sx={{ m: 1 }}
							variant="outlined"
							size="small"
							color="error"
						>
							Sign Out
						</Button>
					</OutsideLink>
				)}
			</Box>
			<LoginDialog title="Sign In" open={signInOpen} close={closeSignIn} />
		</Toolbar>
	);
};

export default Header;
