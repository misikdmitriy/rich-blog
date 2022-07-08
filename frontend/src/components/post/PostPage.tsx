import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
	Box,
	Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { PostQuery } from '../../graphql/queries/post';
import { Post } from '../../types/post';
import NotFound from '../notfound/NotFound';
import { ContentBase } from '../../types/content';
import ContentRoot from '../content/Content';
import { useBackdrop } from '../progress/BackdropProgress';
import { useAppBar } from '../appBar/AppBar';
import { toMessage } from '../../common/errors';

interface OptionalPostResult {
    posts: [Post?]
}

const PostPage = () => {
	const { shortUrl } = useParams();
	const { open: openBackdrop, close: closeBackdrop } = useBackdrop();
	const { open: openSnackbar } = useAppBar();

	const {
		data, loading, error,
	} = useQuery<{ posts: OptionalPostResult }>(PostQuery, {
		variables: {
			shortUrl,
		},
	});

	useEffect(() => {
		if (loading) {
			openBackdrop();
		} else {
			closeBackdrop();
		}
	}, [loading]);

	useEffect(() => {
		if (error) {
			openSnackbar(toMessage(error), 'error');
		}
	}, [error]);

	const [post] = data?.posts?.posts || [];

	if (!loading && !post && !error) {
		return <NotFound />;
	}

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
