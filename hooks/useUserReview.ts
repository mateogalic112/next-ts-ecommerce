import useSWR from 'swr';
import useUser from './useUser';
import fetcher from '../helpers/fetcher';

import { NEXT_URL } from '../config';
import { Order } from '../models/Order';
import { Review } from '../models/Review';

const useUserReview = (productId: string, reviews: Review[]) => {
	const { userData } = useUser();
	const { data, error } = useSWR(`${NEXT_URL}/api/order/my`, fetcher);

	// Maybe later switch to delivered order status
	const hasBoughtProduct = data?.order?.some(
		(order: Order) =>
			order.status === 'paid' && order.order_details.some((detail) => detail.product._id === productId)
	);
	const hasReviewed = reviews.some((review) => review.author._id === userData?.user._id);

	console.log('hasBoughtProduct', hasBoughtProduct);
	console.log('hasReviewed', hasReviewed);

	const loading = !error && !data;
	const canReview = hasBoughtProduct && !hasReviewed;

	return {
		loading,
		canReview,
		error,
	};
};

export default useUserReview;
