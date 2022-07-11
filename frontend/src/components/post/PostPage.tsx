import React from 'react';
import { useQuery } from '@apollo/client';
import {
	Box,
	Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { PostByShortUrlQuery } from '../../graphql/queries/post';
import { Post } from '../../types/post';
import { ContentBase } from '../../types/content';
import ContentRoot from '../content/Content';
import { useLoading } from '../../hooks/loading';
import { useError } from '../../hooks/error';

interface OptionalPostResult {
    posts: [Post?]
}

const PostPage = () => {
	const { shortUrl } = useParams();

	const {
		data, loading, error,
	} = useQuery<{ posts: OptionalPostResult }>(PostByShortUrlQuery, {
		variables: {
			shortUrl,
		},
	});

	useLoading(loading);
	useError([error]);

	const [post] = data?.posts?.posts || [];
	const content: ContentBase = JSON.parse(post?.content || '{}');

	return (
		<>
			<Box>
				<Typography variant="h2" component="h1">
					{post?.title}
				</Typography>
			</Box>
			<Box sx={{ m: 2 }}>
				<ContentRoot content={content} />
			</Box>
		</>
	);
};

export default PostPage;
