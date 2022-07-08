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
						parts: [{
							id: 0,
							title: 'ToDo: First',
							content: 'ToDo: Test',
						}],
					}}
					validationSchema={schema}
					onSubmit={async (values) => {
						try {
							openBackdrop();
							await createPost({
								variables: {
									...values,
									body: '<b>ToDo: update body</b>',
									image: 'ToDo: jpg',
									imageLabel: 'ToDo: label',
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
