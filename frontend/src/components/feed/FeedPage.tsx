import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Post } from '../../types/post';
import PostCard from '../post/PostCard';
import { fetchPosts } from '../../services/posts';

const FeedPage = () => {
	const [nextPage, setNextPage] = useState(0);
	const [posts, setPosts] = useState<Post[] | undefined>();

	useEffect(() => {
		fetchPosts(nextPage)
			.then(({ result }) => {
				setPosts(result.docs);
				setNextPage((prev) => prev + 1);
			});
	}, []);

	return (
		<Grid container spacing={3} alignItems="center" direction="column">
			{posts?.map((post) => <PostCard key={Math.random()} post={post} />)}
		</Grid>
	);
};

export default FeedPage;
