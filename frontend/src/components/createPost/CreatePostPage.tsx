import React from 'react';
import {
	Formik,
} from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import {
	Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CreatePostMutation } from '../../graphql/mutations/createPost';
import { useBackdrop } from '../progress/BackdropProgress';
import { useAppBar } from '../appBar/AppBar';
import { toMessage } from '../../common/errors';
import CreatePostForm from './CreatePostForm';

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

const CreatePostPage = () => {
	const [createPost] = useMutation(CreatePostMutation);
	const { open: openBackdrop, close: closeBackdrop } = useBackdrop();
	const { open: openSnackbar } = useAppBar();
	const navigate = useNavigate();

	return (
		<Box
			sx={{ display: 'flex' }}
			alignItems="center"
			justifyContent="center"
		>
			<Box
				sx={{
					display: 'flex',
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
						title: '',
						shortUrl: '',
						description: '',
						image: '',
						imageLabel: '',
						content: '{}',
					}}
					validationSchema={schema}
					onSubmit={async (values) => {
						try {
							openBackdrop();
							await createPost({
								variables: {
									...values,
								},
							});
							navigate('/');
						} catch (err) {
							openSnackbar(toMessage(err), 'error');
						} finally {
							closeBackdrop();
						}
					}}
				>
					<CreatePostForm />
				</Formik>
			</Box>
		</Box>
	);
};

export default CreatePostPage;
