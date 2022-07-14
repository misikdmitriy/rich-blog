import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
	Button, CircularProgress, Grid, Box,
} from '@mui/material';
import { Post } from '../../types/post';
import PostCard from '../post/PostCard';
import { PostsQuery } from '../../graphql/queries/posts';
import { useError } from '../../hooks/error';

interface PostsResult {
	posts: Post[],
	hasNext: boolean
}

const FeedPage = () => {
	const take = 6;
	const {
		data: {
			posts: {
				posts = [],
				hasNext = false,
			} = {},
		} = {},
		loading,
		error,
		fetchMore,
		refetch,
	} = useQuery<{ posts: PostsResult }>(PostsQuery, {
		variables: {
			take,
			skip: 0,
		},
	});

	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

	useError([error]);

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
		if (hasNext) {
			return (
				<Button variant="outlined" size="small" onClick={loadMore}>
					Load More
				</Button>
			);
		}

		return null;
	};

	const onPostDelete = () => refetch();
	const onPostUnlocked = () => refetch();

	return (
		<>
			<Grid container spacing={6}>
				{posts?.map((post) => (
					<Grid key={`grid-${post.shortUrl}`} item xs={12} md={4}>
						<PostCard
							key={post.shortUrl}
							post={post}
							onPostDeleted={onPostDelete}
							onPostUnlocked={onPostUnlocked}
						/>
					</Grid>
				))}
			</Grid>
			<Box sx={{ m: 4 }} display="flex" justifyContent="center">
				{isLoadingMore || loading ? displayLoading() : displayLoadMore()}
			</Box>
		</>

	);
};

export default FeedPage;
