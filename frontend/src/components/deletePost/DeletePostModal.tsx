import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';
import { Post } from '../../types/post';
import { useDialog } from '../dialog/Dialog';

interface DeletePostModalProps {
    post: Post,
    accept: () => void
}

const DeletePostModal = (props: DeletePostModalProps) => {
	const { post, accept } = props;
	const { isOpen: open, close } = useDialog();

	return (
		<Dialog
			open={open}
			onClose={close}
			aria-labelledby="alert-delete-post"
			aria-describedby="alert-delete"
		>
			<DialogTitle id="alert-dialog-title">
				Delete Post
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-delete">
					Are you sure you want to delete &apos;
					{post.title}
					&apos;?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={close} color="warning">Cancel</Button>
				<Button
					onClick={() => {
						accept();
						close();
					}}
					autoFocus
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeletePostModal;
