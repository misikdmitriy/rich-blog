import React from 'react';
import { useQuery } from '@apollo/client';
import {
	Box,
	CircularProgress, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { PostQuery } from '../../graphql/queries/post';
import { Post } from '../../types/post';
import NotFound from '../notfound/NotFound';

interface OptionalPostResult {
    posts: [Post?]
}

const PostPage = () => {
	const { shortUrl } = useParams();
	const {
		data: {
			posts: {
				posts: [post] = [],
			} = {},
		} = {}, loading,
	} = useQuery<{ posts: OptionalPostResult }>(PostQuery, {
		variables: {
			shortUrl,
		},
	});

	if (!loading && !post) {
		return <NotFound />;
	}

	if (loading) {
		return (<Box sx={{ m: 4 }} display="flex" justifyContent="center"><CircularProgress /></Box>);
	}

	return (
		<>
			<Box>
				<Typography variant="h2" component="h1">
					{post?.title}
				</Typography>
			</Box>
			<Box sx={{ m: 2 }} dangerouslySetInnerHTML={{ __html: post?.body || '' }} />
		</>
	);
};

export default PostPage;
