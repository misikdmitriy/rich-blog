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
import Dialog, { DialogConsumer } from '../dialog/Dialog';
import AuthRequired from '../auth/AuthRequired';
import NoAuth from '../auth/NoAuth';

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
	const { title } = props;

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
			<Box display="flex" sx={{ flexDirection: 'row' }}>
				<AuthRequired authRole="admin">
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
				</AuthRequired>
				<NoAuth>
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
				</NoAuth>
				<AuthRequired>
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
				</AuthRequired>
			</Box>
		</Toolbar>
	);
};

export default Header;
