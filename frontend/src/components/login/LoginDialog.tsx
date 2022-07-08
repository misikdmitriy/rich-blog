import React from 'react';
import {
	Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@mui/material';
import LoginWithGoogle from './LoginWithGoogle';
import { useDialog } from '../dialog/Dialog';

interface LoginDialogProps {
	title: string
}

const LoginDialog = (props: LoginDialogProps) => {
	const { title } = props;
	const { isOpen: open, close } = useDialog();

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
