import React, { useState, useEffect } from 'react';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { Grid } from '@mui/material';
import { Post } from '../../types/post';
import PostCard from '../post/PostCard';
import { PostsQuery } from '../../graphql/posts';

const FeedPage = () => {
	const client = useApolloClient();

	const [nextPage, setNextPage] = useState(0);
	const [posts, setPosts] = useState<Post[]>([]);

	const fetchData = async () => {
		const { data: { posts: data } } : ApolloQueryResult<{ posts: Post[] }> = await client.query({
			query: PostsQuery,
			variables: {
				pageNum: nextPage,
			},
		});

		setPosts(data);
		setNextPage(nextPage + 1);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Grid container spacing={3} alignItems="center" direction="column">
			{posts?.map((post) => <PostCard key={Math.random()} post={post} />)}
		</Grid>
	);
};

export default FeedPage;
