import React, { useEffect } from 'react';
import {
	Formik,
} from 'formik';
import { useLazyQuery, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import {
	Box,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CreatePostMutation } from '../../graphql/mutations/createPost';
import { useBackdrop } from '../progress/BackdropProgress';
import { useAppBar } from '../appBar/AppBar';
import { toMessage } from '../../common/errors';
import CreatePostForm from './CreatePostForm';
import { Post } from '../../types/post';
import { UpdatePostMutation } from '../../graphql/mutations/updatePost';
import { PostByIdQuery } from '../../graphql/queries/post';

const schema = Yup.object().shape({
	title: Yup.string().required(),
	shortUrl: Yup.string().required(),
	description: Yup.string().required(),
	image: Yup.string().matches(
		/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
	).required(),
	imageLabel: Yup.string().required(),
	content: Yup.string().required(),
});

interface OptionalPostResult {
    posts: [Post?]
}

const CreatePostPage = () => {
	const { postId } = useParams();
	const navigate = useNavigate();

	const [createPost, {
		loading: createLoading,
		error: createError,
	}] = useMutation(CreatePostMutation);

	const [updatePost, {
		loading: updateLoading,
		error: updateError,
	}] = useMutation(UpdatePostMutation);

	const { open: openBackdrop, close: closeBackdrop } = useBackdrop();
	const { open: openSnackbar } = useAppBar();

	const [loadPost, {
		data,
		error: errorPost,
		loading: loadingPost,
	}] = useLazyQuery<{ posts: OptionalPostResult }>(PostByIdQuery, {
		variables: {
			id: postId,
		},
	});

	const [post] = data?.posts?.posts || [];

	useEffect(() => {
		if (postId) {
			loadPost();
		}
	}, [postId]);

	const errorEffect = (error: unknown) => () => {
		if (errorPost) {
			openSnackbar(toMessage(error), 'error');
		}
	};

	useEffect(errorEffect(errorPost), [errorPost]);
	useEffect(errorEffect(createError), [createError]);
	useEffect(errorEffect(updateError), [updateError]);

	useEffect(() => {
		if (loadingPost || createLoading || updateLoading) {
			openBackdrop();
		} else {
			closeBackdrop();
		}
	}, [loadingPost, createLoading, updateLoading]);

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				display="flex"
				sx={{
					width: {
						sx: 'auto',
						md: '50vw',
					},
				}}
				alignItems="center"
				justifyContent="center"
			>
				<Formik
					initialValues={{
						title: post?.title ?? '',
						shortUrl: post?.shortUrl ?? '',
						description: post?.description ?? '',
						image: post?.image ?? '',
						imageLabel: post?.imageLabel ?? '',
						content: post?.content ?? '{}',
					}}
					validationSchema={schema}
					onSubmit={async (values) => {
						if (!post?.id) {
							await createPost({
								variables: {
									...values,
								},
							});
						} else {
							await updatePost({
								variables: {
									id: post.id,
									...values,
								},
							});
						}

						navigate('/');
					}}
				>
					<CreatePostForm post={post} />
				</Formik>
			</Box>
		</Box>
	);
};

export default CreatePostPage;
