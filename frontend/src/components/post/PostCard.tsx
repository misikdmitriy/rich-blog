import React from 'react';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Box,
	IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Post } from '../../types/post';
import { DeletePost } from '../../graphql/mutations/deletePost';
import { useBackdrop } from '../progress/BackdropProgress';
import { useAppBar } from '../appBar/AppBar';
import { toMessage } from '../../common/errors';
import Dialog, { DialogConsumer } from '../dialog/Dialog';
import DeletePostModal from '../deletePost/DeletePostModal';
import AuthRequired from '../auth/AuthRequired';

interface PostCardProps {
	post: Post;
	onPostDeleted?: () => void
}

const PostCard = (props: PostCardProps) => {
	const { post, onPostDeleted = () => {} } = props;

	const [deletePost] = useMutation(DeletePost);
	const { open: openBackdrop, close: closeBackdrop } = useBackdrop();
	const { open: openSnackbar } = useAppBar();

	const deletePostHandler = async () => {
		try {
			openBackdrop();
			await deletePost({
				variables: {
					id: post.id,
				},
			});
			openSnackbar(`Post '${post.title}' deleted successfully`, 'success');
			onPostDeleted();
		} catch (err) {
			openSnackbar(`Error on post '${post.title}' deletion. Details: ${toMessage(err)}`, 'error');
		} finally {
			closeBackdrop();
		}
	};

	return (
		<Card sx={{ display: 'flex', overflowY: 'hidden', flexDirection: 'column' }}>
			<Link to={`/posts/id/${post.shortUrl}`} style={{ textDecoration: 'none', color: 'inherit' }}>
				<CardActionArea>
					<CardMedia
						component="img"
						sx={{
							height: 260,
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
						image={post.image}
						alt={post.imageLabel}
					/>
					<CardContent>
						<Typography component="h3" variant="h4">
							{post.title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{moment(post.createdDate).format('MMMM Do YYYY')}
						</Typography>
						<Typography variant="body1" paragraph sx={{ m: 4 }}>
							{post.description}
						</Typography>
						<Typography variant="body1" color="primary">
							Continue reading...
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
			<AuthRequired>
				<Dialog>
					<DialogConsumer>
						{({ open }) => (
							<Box display="flex" alignItems="center" sx={{ pl: 1, pb: 1 }}>
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
							</Box>
						)}
					</DialogConsumer>

					<DeletePostModal post={post} accept={deletePostHandler} />
				</Dialog>
			</AuthRequired>
		</Card>
	);
};

PostCard.defaultProps = {
	onPostDeleted: () => {},
};

export default PostCard;
