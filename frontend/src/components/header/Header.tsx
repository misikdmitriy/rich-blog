import React from 'react';
import {
	Typography,
	Toolbar,
	Button,
	Box,
	Link as OutsideLink,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import LoginDialog from '../login/LoginDialog';
import { useAuth } from '../auth/Auth';
import Dialog, { DialogConsumer } from '../dialog/Dialog';

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
	const { title } = props;

	const auth = useAuth();

	const {
		data: {
			me = {
				isAuthenticated: false,
			},
		} = {},
		loading,
	} = auth || {};

	const { isAuthenticated, user } = me;

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
					<Dialog>
						<DialogConsumer>
							{({ open }) => (
								<Button
									sx={{ m: 1 }}
									variant="outlined"
									size="small"
									onClick={open}
									color="info"
								>
									Sign In
								</Button>
							)}
						</DialogConsumer>
						<LoginDialog title="Sign In" />
					</Dialog>
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
		</Toolbar>
	);
};

export default Header;
