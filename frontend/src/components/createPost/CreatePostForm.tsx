import React, { useEffect } from 'react';
import {
	useFormikContext,
	Form,
} from 'formik';
import { Box, Button } from '@mui/material';
import { CreatePostValues } from './types';
import FormTextField from '../form/FormTextField';
import ImageValidator from './ImageValidator';
import { Post } from '../../types/post';

const generateShortUrl = (title: string) => title.trim().replace(/[\s.,:?]+/g, '-').toLowerCase();

interface CreatePostFormProps {
	post?: Post
}

const CreatePostForm = (props: CreatePostFormProps) => {
	const { post } = props;

	const values = useFormikContext<CreatePostValues>();
	const {
		values: { title },
		setFieldValue,
		setValues,
	} = values;

	useEffect(() => {
		setFieldValue('shortUrl', generateShortUrl(title));
	}, [title]);

	useEffect(() => {
		if (post) {
			setValues(post);
		}
	}, [post]);

	return (
		<Form style={{
			display: 'flex',
			flexDirection: 'column',
			flexGrow: 1,
		}}
		>
			<FormTextField name="title" title="Title" values={values} />
			<Box display="flex" sx={{ flexDirection: 'row' }}>
				<FormTextField name="shortUrl" title="Short URL" values={values} />
				<Button
					sx={{ m: 3 }}
					size="small"
					color="secondary"
					onClick={() => setFieldValue('shortUrl', generateShortUrl(title))}
				>
					Regenerate
				</Button>
			</Box>
			<FormTextField name="description" title="Description" values={values} multiline rows={2} />
			<FormTextField name="content" title="Content" values={values} multiline rows={4} />
			<Box display="flex" sx={{ flexDirection: 'row' }}>
				<FormTextField name="image" title="Image" values={values} />
				<ImageValidator image={values.values.image} />
			</Box>
			<FormTextField name="imageLabel" title="Image ALT" values={values} />
			<Button
				sx={{ m: 1 }}
				variant="outlined"
				size="large"
				color="success"
				type="submit"
			>
				{post?.id ? 'Update' : 'Create'}
			</Button>
		</Form>
	);
};

CreatePostForm.defaultProps = {
	post: undefined,
};

export default CreatePostForm;
