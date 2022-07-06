import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button } from '@mui/material';

const schema = Yup.object().shape({
	title: Yup.string().required(),
	shortUrl: Yup.string().required(),
	description: Yup.string().required(),
});

const CreatePostPage = () => (
	<Box sx={{ display: 'flex' }} alignItems="center" justifyContent="center">
		<Formik
			initialValues={{
				title: '',
				shortUrl: '',
				description: '',
			}}
			validationSchema={schema}
			onSubmit={() => {}}
		>
			{() => (
				<Form style={{ display: 'flex', flexDirection: 'column' }}>
					<Field
						name="title"
						component={TextField}
						margin="normal"
						required
						label="Title"
						type="text"
						id="title"
					/>
					<Field
						name="shortUrl"
						component={TextField}
						margin="normal"
						required
						label="Short URL"
						type="text"
						id="title"
					/>
					<Field
						name="description"
						component={TextField}
						margin="normal"
						multiline
						rows={4}
						required
						label="Description"
						type="text"
						id="title"
					/>
					<Button
						sx={{ m: 1 }}
						variant="outlined"
						size="large"
						color="success"
					>
						Create

					</Button>
				</Form>
			)}
		</Formik>
	</Box>
);

export default CreatePostPage;
