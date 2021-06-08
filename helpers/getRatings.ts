import { Review } from '../models/Product';

type OverallRatingProps = {
	reviews: Review[];
};

export const getRating = (args: OverallRatingProps): number => {
	return args.reviews.reduce((acc, currVal, _, arr) => (acc + currVal.rating) / arr.length, 0);
};
