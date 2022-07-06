import React from 'react';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Post } from '../../types/post';

interface PostCardProps {
	post: Post;
}

const PostCard = (props: PostCardProps) => {
	const { post } = props;

	return (
		<CardActionArea>
			<Link to={`/posts/id/${post.shortUrl}`} style={{ textDecoration: 'none' }}>
				<Card sx={{ display: 'flex', overflowY: 'hidden', flexDirection: 'column' }}>
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
				</Card>
			</Link>
		</CardActionArea>
	);
};

export default PostCard;
