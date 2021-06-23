import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { mutate } from 'swr';

import axios from 'axios';
import { API_URL, NEXT_URL } from '../../config';

import { TextField, Button, Container } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Spacer from '../widgets/Spacer';

import { Review } from '../../models/Review';
import useUser from '../../hooks/useUser';
import qs from 'qs';

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
	slug: string;
	reviews: Review[];
	isValidating: boolean;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ product, slug, reviews, isValidating }) => {
	const [ratingValue, setRatingValue] = React.useState(0);

	const { userData } = useUser();

	const query = qs.stringify({
		_where: [{ 'product.slug': slug }],
	});

	const formik = useFormik({
		initialValues: {
			review: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { resetForm, setStatus, setSubmitting }) => {
			try {
				mutate(
					`${API_URL}/reviews?${query}`,
					[
						...reviews,
						{
							_id: '123',
							content: values.review,
							rating: ratingValue,
							author: userData?.user?._id,
							product,
							createdAt: new Date(),
						},
					],
					false
				);
				await createReview(values.review, ratingValue, userData.user._id, product);
				resetForm({});
				setRatingValue(0);
				setStatus({ success: true });
				mutate(`${API_URL}/reviews?${query}`);
			} catch (_) {
				setStatus({ success: false });
				setSubmitting(false);
			}
		},
	});

	if (formik.isSubmitting || isValidating) return <h1>Submitting...</h1>;

	return (
		<Container>
			<form onSubmit={formik.handleSubmit}>
				{formik.status?.success === false && !formik.isSubmitting && <p>Error occured</p>}
				{formik.status?.success && !formik.isSubmitting && <p>Review Sent</p>}
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
