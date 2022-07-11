import React, { useEffect } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { Post } from '../../types/post';
import { useDialog } from '../dialog/Dialog';
import { DeletePost } from '../../graphql/mutations/deletePost';
import { useBackdrop } from '../progress/BackdropProgress';
import { useAppBar } from '../appBar/AppBar';
import { toMessage } from '../../common/errors';

interface DeletePostModalProps {
    post: Post,
    onPostDeleted?: () => void
}

const DeletePostModal = (props: DeletePostModalProps) => {
	const { post, onPostDeleted = () => {} } = props;
	const { isOpen: open, close } = useDialog();

	const [deletePost, { loading, error }] = useMutation(DeletePost);
	const { open: openBackdrop, close: closeBackdrop } = useBackdrop();
	const { open: openSnackbar } = useAppBar();

	useEffect(() => {
		if (loading) {
			openBackdrop();
		} else {
			closeBackdrop();
		}
	}, [loading]);

	useEffect(() => {
		if (error) {
			openSnackbar(`Error on post '${post.title}' deletion. Details: ${toMessage(error)}`, 'error');
		}
	}, [error]);

	const deletePostHandler = async () => {
		close();

		await deletePost({
			variables: {
				id: post.id,
			},
		});

		openSnackbar(`Post '${post.title}' deleted successfully`, 'success');
		onPostDeleted();
	};

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
					onClick={deletePostHandler}
					autoFocus
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

DeletePostModal.defaultProps = {
	onPostDeleted: () => {},
};

export default DeletePostModal;
