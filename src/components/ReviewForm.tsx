import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import axios from 'axios';
import { NEXT_URL } from '../../config';

import { TextField, Button, Container } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Spacer from '../widgets/Spacer';

import { Review } from '../../models/Review';
import useUser from '../../hooks/useUser';

const validationSchema = yup.object({
	review: yup.string().min(10, 'Minimun 10 letters required').required('Review is required'),
});

const createReview = async (
	content: string,
	rating: number,
	author: string,
	product: string
): Promise<Review | void> => {
	if (rating === 0) {
		return;
	}
	return await axios
		.post(`${NEXT_URL}/api/review/create`, {
			content,
			rating,
			author,
			product,
		})
		.then((response) => {
			return response.data as Review;
		})
		.catch((err) => {
			console.log('req', err);
		});
};

type ReviewFormProps = {
	product: string;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ product }) => {
	const [ratingValue, setRatingValue] = React.useState(0);

	const { userData } = useUser();

	const formik = useFormik({
		initialValues: {
			review: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			formik.setSubmitting(true);
			await createReview(values.review, ratingValue, userData.user._id, product);
			formik.setSubmitting(false);
		},
	});

	if (formik.isSubmitting) return <h1>Submitting...</h1>;

	return (
		<Container>
			<form onSubmit={formik.handleSubmit}>
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
					defaultValue={0}
					getLabelText={(_) => 'Stars'}
					precision={0.5}
					name="rating"
					value={ratingValue}
					onChange={(_, value) => setRatingValue(value as number)}
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
