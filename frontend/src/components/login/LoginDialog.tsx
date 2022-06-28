import React from 'react';
import {
	Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@mui/material';
import LoginWithGoogle from './LoginWithGoogle';

interface LoginDialogProps {
	title: string
	open: boolean
	close: () => void
}

const LoginDialog = (props: LoginDialogProps) => {
	const { title, open, close } = props;

	return (
		<Dialog open={open} onClose={close}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<LoginWithGoogle />
			</DialogContent>
			<DialogActions>
				<Button onClick={close}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
};

export default LoginDialog;
