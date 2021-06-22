import React from 'react';

import { Box, Container, Typography } from '@material-ui/core';
import { Review } from '../../models/Review';
import UserReview from './UserReview';

type ReviewListProps = {
	reviews: Review[];
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
	return (
		<Container>
			<Typography variant="h4" component="h5">
				Reviews (<span>{reviews.length}</span>)
			</Typography>

			<Box>
				{reviews.map((review) => (
					<UserReview key={review._id} review={review} />
				))}
			</Box>
		</Container>
	);
};

export default ReviewList;
