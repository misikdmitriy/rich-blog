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
import { useAppBar } from '../appBar/AppBar';
import { useError } from '../../hooks/error';
import { useLoading } from '../../hooks/loading';

interface DeletePostModalProps {
    post: Post,
    onPostDeleted?: () => void
}

interface DeletePostResult {
	success: boolean
}

const DeletePostModal = (props: DeletePostModalProps) => {
	const { post, onPostDeleted = () => {} } = props;
	const { isOpen: open, close } = useDialog();

	const [deletePost,
		{ data, loading, error }] = useMutation<{deletePost: DeletePostResult}>(DeletePost);

	const { open: openSnackbar } = useAppBar();

	useEffect(() => {
		if (data && data.deletePost) {
			if (data.deletePost.success) {
				openSnackbar(`Post '${post.title}' deleted successfully`, 'success');
				onPostDeleted();
			} else {
				openSnackbar(`Post '${post.title}' was not deleted`, 'warning');
			}
		}
	}, [data]);

	useLoading(loading);
	useError([error], (msg) => `Error on post '${post.title}' deletion. Details: ${msg}`);

	const deletePostHandler = () => {
		close();

		return deletePost({
			variables: {
				id: post.id,
			},
		});
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
