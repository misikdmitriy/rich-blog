import React from 'react';
import {
	Box,
	IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import Dialog, { DialogConsumer } from '../dialog/Dialog';
import UnlockPostModal from '../unlockPost/UnlockPostModal';
import DeletePostModal from '../deletePost/DeletePostModal';
import { Post } from '../../types/post';

interface PostCardButtonsProps {
	post: Post;
	onPostDeleted?: () => void
	onPostUnlocked?: () => void
}

const PostCardButtons = (props: PostCardButtonsProps) => {
	const { post, onPostDeleted, onPostUnlocked } = props;

	return (
		<Box display="flex" alignItems="center" sx={{ pl: 1, pb: 1 }}>
			{!post.availableFor.includes('user') && (
				<Dialog>
					<DialogConsumer>
						{({ open }) => (
							<IconButton
								color="success"
								aria-label="unlock"
								onClick={(event) => {
									event.stopPropagation();
									open();
								}}
							>
								<KeyIcon />
							</IconButton>
						)}
					</DialogConsumer>

					<UnlockPostModal post={post} onPostUnlocked={onPostUnlocked} />
				</Dialog>
			)}

			<Link to={`/posts/edit/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
				<IconButton
					color="warning"
					aria-label="edit"
				>
					<EditIcon />
				</IconButton>
			</Link>

			<Dialog>
				<DialogConsumer>
					{({ open }) => (
						<IconButton
							color="error"
							aria-label="delete"
							onClick={(event) => {
								event.stopPropagation();
								open();
							}}
						>
							<DeleteIcon />
						</IconButton>
					)}
				</DialogConsumer>

				<DeletePostModal post={post} onPostDeleted={onPostDeleted} />
			</Dialog>

		</Box>
	);
};

PostCardButtons.defaultProps = {
	onPostDeleted: () => {},
	onPostUnlocked: () => {},
};

export default PostCardButtons;
