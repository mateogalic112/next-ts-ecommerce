import React from 'react';
import { Rating } from '@material-ui/lab';

import { Box, Typography } from '@material-ui/core';
import { Review } from '../../models/Review';

type ReviewProps = {
	review: Review;
};

const UserReview: React.FC<ReviewProps> = ({ review }) => {
	return (
		<Box p={4} bgcolor="white" my={4}>
			<Typography paragraph>{review.author.username}</Typography>
			<Typography variant="body2" gutterBottom paragraph>
				{review.createdAt.toString().substring(0, 10)}
			</Typography>
			<Typography paragraph>{review.content}</Typography>
			<Rating name="review-rating" value={review.rating} readOnly />
		</Box>
	);
};

export default UserReview;
