import {
	Typography, Toolbar, Button, IconButton, Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import LoginDialog from '../login/LoginDialog';

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

const Header = (props: HeaderProps) => {
	const { sections, title } = props;

	const [signInOpen, setSignInOpen] = useState<boolean>(false);

	const openSignIn = () => setSignInOpen(true);
	const closeSignIn = () => setSignInOpen(false);

	return (
		<>
			<Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Button size="small">Subscribe</Button>
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
				<IconButton>
					<SearchIcon />
				</IconButton>
				<Button variant="outlined" size="small" onClick={openSignIn}>
					Sign In
				</Button>
				<LoginDialog title="Sign In" open={signInOpen} close={closeSignIn} />
			</Toolbar>
			<Toolbar
				component="nav"
				variant="dense"
				sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
			>
				{sections.map((section) => (
					<Link
						color="inherit"
						noWrap
						key={section.title}
						variant="body2"
						href={section.url}
						sx={{ p: 1, flexShrink: 0 }}
					>
						{section.title}
					</Link>
				))}
			</Toolbar>
		</>
	);
};

export default Header;
