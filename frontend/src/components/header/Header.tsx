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
import { useTranslation } from 'react-i18next';
import LoginDialog from '../login/LoginDialog';
import Dialog, { DialogConsumer } from '../dialog/Dialog';
import AuthRequired from '../auth/AuthRequired';
import NoAuth from '../auth/NoAuth';

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
	const { title } = props;

	const { t } = useTranslation();

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
							{t('addPost')}
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
									{t('signIn')}
								</Button>
							)}
						</DialogConsumer>
						<LoginDialog title={t('signIn')} />
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
							{t('signOut')}
						</Button>
					</OutsideLink>
				</AuthRequired>
			</Box>
		</Toolbar>
	);
};

export default Header;
