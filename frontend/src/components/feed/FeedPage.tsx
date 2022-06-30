import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Grid } from '@mui/material';
import { Post } from '../../types/post';
import PostCard from '../post/PostCard';
import { PostsQuery } from '../../graphql/posts';

const FeedPage = () => {
	const take = 10;
	const { data: { posts } = {}, fetchMore } = useQuery<{ posts: Post[] }>(PostsQuery, {
		variables: {
			$take: take,
		},
	});

	const loadMore = () => {
		fetchMore({
			variables: {
				$take: take,
				$skip: posts?.length || 0,
			},
		});
	};

	return (
		<Grid container spacing={3} alignItems="center" direction="column">
			{posts?.map((post) => <PostCard key={Math.random()} post={post} />)}
			<Grid item>
				<Button variant="outlined" size="small" onClick={loadMore}>
					Load More
				</Button>
			</Grid>
		</Grid>
	);
};

export default FeedPage;
