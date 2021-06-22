import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { TextField, Button, Box, Container } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Spacer from '../widgets/Spacer';

const validationSchema = yup.object({
	review: yup.string().min(10, 'Minimun 10 letters required').required('Review is required'),
	rating: yup.number().max(5, 'Max 5 stars').min(1, 'Min 1 star').required('Rating is required'),
});

const ReviewForm: React.FC = () => {
	const formik = useFormik({
		initialValues: {
			review: '',
			rating: 0,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<Container>
			<form>
				<TextField
					fullWidth
					multiline
					rows={3}
					id="review"
					name="review"
					label="Review"
					value={formik.values.review}
					onChange={formik.handleChange}
					error={formik.touched.review && Boolean(formik.errors.review)}
					helperText={formik.touched.review && formik.errors.review}
				/>

				<Spacer marginTop="1rem" />

				<Rating
					defaultValue={formik.values.rating}
					getLabelText={(_) => 'Stars'}
					precision={0.5}
					name="rating"
					value={formik.values.rating}
					onChange={formik.handleChange}
				/>

				<Spacer marginTop="1rem" />

				<Button color="primary" variant="contained" fullWidth type="submit">
					Submit
				</Button>
			</form>
			<Spacer marginTop="3rem" />
		</Container>
	);
};

export default ReviewForm;
