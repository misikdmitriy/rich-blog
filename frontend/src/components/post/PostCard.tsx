import React from 'react';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Post } from '../../types/post';
import AuthRequired from '../auth/AuthRequired';
import PostCardButtons from './PostCardButtons';

interface PostCardProps {
	post: Post;
	onPostDeleted?: () => void
	onPostUnlocked?: () => void
}

const PostCard = (props: PostCardProps) => {
	const { post, onPostDeleted, onPostUnlocked } = props;

	const { t } = useTranslation();

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
							{new Intl.DateTimeFormat('ua-UA', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							}).format(new Date(post.createdDate))}
						</Typography>
						<Typography variant="body1" paragraph>
							{post.description}
						</Typography>
						<Typography variant="body1" color="primary">
							{t('continueRead')}
							...
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
			<AuthRequired>
				<PostCardButtons
					post={post}
					onPostDeleted={onPostDeleted}
					onPostUnlocked={onPostUnlocked}
				/>
			</AuthRequired>
		</Card>
	);
};

PostCard.defaultProps = {
	onPostDeleted: () => {},
	onPostUnlocked: () => {},
};

export default PostCard;
