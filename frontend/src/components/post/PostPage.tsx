import React from 'react';
import { useQuery } from '@apollo/client';
import {
	CircularProgress, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { PostQuery } from '../../graphql/post';
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
		return <CircularProgress />;
	}

	return (
		<div style={{ margin: '1em 4em' }}>
			<div>
				<Typography variant="h2" component="h1">
					{post?.title}
				</Typography>
			</div>
			<div dangerouslySetInnerHTML={{ __html: post?.body || '' }} />
		</div>
	);
};

export default PostPage;
