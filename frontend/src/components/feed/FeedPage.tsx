import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, CircularProgress, Grid } from '@mui/material';
import { Post } from '../../types/post';
import PostCard from '../post/PostCard';
import { PostsQuery } from '../../graphql/posts';

interface PostsResult {
	posts: Post[],
	hasNext: boolean
}

const FeedPage = () => {
	const take = 5;
	const {
		data: {
			posts: {
				posts = [],
				hasNext = false,
			} = {},
		} = {},
		loading,
		fetchMore,
	} = useQuery<{ posts: PostsResult }>(PostsQuery, {
		variables: {
			take,
			skip: 0,
		},
	});

	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

	const loadMore = async () => {
		setIsLoadingMore(true);
		await fetchMore({
			variables: {
				take,
				skip: posts?.length || 0,
			},
		});
		setIsLoadingMore(false);
	};

	const displayLoading = () => <CircularProgress />;

	const displayLoadMore = () => {
		if (isLoadingMore) {
			return displayLoading();
		}

		if (hasNext) {
			return (
				<Button variant="outlined" size="small" onClick={loadMore}>
					Load More
				</Button>
			);
		}

		return null;
	};

	const displayItems = () => (
		<>
			{posts?.map((post) => <PostCard key={post.shortUrl} post={post} />)}
			<Grid item>
				{displayLoadMore()}
			</Grid>
		</>
	);

	return (
		<Grid container spacing={3} alignItems="center" direction="column">
			{loading ? displayLoading() : displayItems()}
		</Grid>
	);
};

export default FeedPage;
