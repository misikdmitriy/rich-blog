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
import { useAppBar } from '../appBar/AppBar';
import { useError } from '../../hooks/error';
import { useLoading } from '../../hooks/loading';
import { UnlockPost } from '../../graphql/mutations/unlockPost';

interface UnlockPostModalProps {
    post: Post,
    onPostUnlocked?: () => void
}

interface UnlockPostResult {
	success: boolean
}

const UnlockPostModal = (props: UnlockPostModalProps) => {
	const { post, onPostUnlocked = () => {} } = props;
	const { isOpen: open, close } = useDialog();

	const [unlockPost,
		{ data, loading, error }] = useMutation<{updatePost: UnlockPostResult}>(UnlockPost);

	const { open: openSnackbar } = useAppBar();

	useLoading(loading);
	useError([error], (msg) => `Error on post '${post.title}' unlock. Details: ${msg}`);

	useEffect(() => {
		if (data && data.updatePost) {
			if (data.updatePost.success) {
				openSnackbar(`Post '${post.title}' unlocked successfully`, 'success');
				onPostUnlocked();
			} else {
				openSnackbar(`Post '${post.title}' was not unlocked`, 'warning');
			}
		}
	}, [data]);

	const unlockPostHandler = () => {
		close();

		return unlockPost({
			variables: {
				id: post.id,
			},
		});
	};

	return (
		<Dialog
			open={open}
			onClose={close}
			aria-labelledby="alert-unlock-post"
			aria-describedby="alert-unlock"
		>
			<DialogTitle id="alert-dialog-title">
				Unlock Post
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-unlock">
					Are you sure you want to unlock &apos;
					{post.title}
					&apos;?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={close} color="warning">Cancel</Button>
				<Button
					onClick={unlockPostHandler}
					autoFocus
					color="success"
				>
					Unlock
				</Button>
			</DialogActions>
		</Dialog>
	);
};

UnlockPostModal.defaultProps = {
	onPostUnlocked: () => {},
};

export default UnlockPostModal;
