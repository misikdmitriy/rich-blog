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
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import { Post } from '../../types/post';
import Dialog, { DialogConsumer } from '../dialog/Dialog';
import DeletePostModal from '../deletePost/DeletePostModal';
import AuthRequired from '../auth/AuthRequired';
import UnlockPostModal from '../unlockPost/UnlockPostModal';

interface PostCardProps {
	post: Post;
	onPostDeleted?: () => void
	onPostUnlocked?: () => void
}

const PostCard = (props: PostCardProps) => {
	const { post, onPostDeleted, onPostUnlocked } = props;

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
						<Typography variant="body1" paragraph>
							{post.description}
						</Typography>
						<Typography variant="body1" color="primary">
							Continue reading...
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
			<AuthRequired>
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
			</AuthRequired>
		</Card>
	);
};

PostCard.defaultProps = {
	onPostDeleted: () => {},
	onPostUnlocked: () => {},
};

export default PostCard;
