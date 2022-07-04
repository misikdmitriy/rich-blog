import React from 'react';
import {
	Grid,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import moment from 'moment';
import { Post } from '../../types/post';

interface PostCardProps {
	post: Post;
}

const PostCard = (props: PostCardProps) => {
	const { post } = props;

	return (
		<Grid item xs={12} md={6} sx={{ overflowY: 'hidden' }}>
			<CardActionArea component="a" href={`/posts/${post.shortUrl}`}>
				<Card sx={{ display: 'flex' }}>
					<CardContent sx={{ flex: 1 }}>
						<Typography component="h3" variant="h5">
							{post.title}
						</Typography>
						<Typography variant="subtitle2" color="text.secondary">
							{moment(post.createdDate).format('MMMM Do YYYY')}
						</Typography>
						<Typography variant="subtitle2" paragraph sx={{ marginTop: '1em' }}>
							{post.description}
						</Typography>
						<Typography variant="subtitle2" color="primary">
							Continue reading...
						</Typography>
					</CardContent>
					<CardMedia
						component="img"
						sx={{ width: 260, display: { xs: 'none', sm: 'block' } }}
						image={post.image}
						alt={post.imageLabel}
					/>
				</Card>
			</CardActionArea>
		</Grid>
	);
};

export default PostCard;
