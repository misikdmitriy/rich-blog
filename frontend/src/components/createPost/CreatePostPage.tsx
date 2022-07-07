import React, { useEffect } from 'react';
import {
	Formik, Form, Field, useFormikContext, FormikContextType,
} from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button } from '@mui/material';

const schema = Yup.object().shape({
	title: Yup.string().required(),
	shortUrl: Yup.string().required(),
	description: Yup.string().required(),
});

const generateShortUrl = (title: string) => title.trim().replace(/[\s.,:?]+/g, '-').toLowerCase();

interface CreatePostValues {
	title: string,
	shortUrl: string,
	description: string,
}

const CreatePostContext: React.FC = () => {
	const {
		values: { title },
		setFieldValue,
	} = useFormikContext<CreatePostValues>();

	useEffect(() => {
		setFieldValue('shortUrl', generateShortUrl(title));
	}, [title]);

	return null;
};

const CreatePostPage = () => {
	function createTextField <TName extends keyof CreatePostValues & string>(
		name: TName,
		title: string,
		{
			values: {
				[name]: value,
			},
			setFieldValue,
			touched: {
				[name]: touched,
			},
			errors: {
				[name]: errors,
			},
		}: FormikContextType<CreatePostValues>,
		other: Record<string, unknown> = {},
	) {
		return (
			<Field
				name={name}
				fullWidth
				component={TextField}
				margin="normal"
				label={title}
				value={value}
				error={touched && Boolean(errors)}
				helperText={touched && errors}
				type="text"
				id={name}
				onChange={
					(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue(name, event.target.value)
				}
				{...other}
			/>
		);
	}

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
						sx: '90vw',
						md: '60vw',
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
					}}
					validationSchema={schema}
					onSubmit={() => { }}
				>
					{(values: FormikContextType<CreatePostValues>) => (
						<Form style={{
							display: 'flex',
							flexDirection: 'column',
							flexGrow: 1,
						}}
						>
							{createTextField('title', 'Title', values)}
							<Box sx={{
								display: 'flex',
								flexDirection: 'row',
							}}
							>
								{createTextField('shortUrl', 'Short URL', values)}
								<Button
									sx={{ m: 3 }}
									size="small"
									color="secondary"
									onClick={() => {
										values.setFieldValue('shortUrl', generateShortUrl(values.values.title));
									}}
								>
									Regenerate
								</Button>
							</Box>
							{createTextField('description', 'Description', values, { multiline: true, rows: 3 })}
							<Button
								sx={{ m: 1 }}
								variant="outlined"
								size="large"
								color="success"
								type="submit"
							>
								Create

							</Button>
							<CreatePostContext />
						</Form>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

export default CreatePostPage;
