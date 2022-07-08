import { TextField } from '@mui/material';
import { Field, FormikContextType } from 'formik';
import React from 'react';

type FormTextFieldProps<TValues> = Record<string, unknown> & {
    name: keyof TValues & string,
    title: string,
    values: FormikContextType<TValues>
}

const FormTextField = <TValues, >(props: FormTextFieldProps<TValues>) => {
	const {
		name,
		title,
		values: {
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
		},
		...other
	} = props;

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
			color="info"
			onChange={
				(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue(name, event.target.value)
			}
			{...other}
		/>
	);
};

export default FormTextField;
