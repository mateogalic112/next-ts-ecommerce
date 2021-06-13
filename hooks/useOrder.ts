import { useState, useEffect } from 'react';
import axios from 'axios';
import { NEXT_URL } from '../config';
import { Order } from '../models/Order';

const useOrder = (session_id: string) => {
	const [data, setData] = useState<{ order: Order } | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchOrder = async (): Promise<void> => {
			setLoading(true);
			await axios
				.post(`${NEXT_URL}/api/order/confirm`, {
					checkout_session: session_id,
				})
				.then((orderResponse) => {
					setData(orderResponse.data);
				})
				.catch((err) => {
					console.log(err);

					setError(err.message);
				});
			setLoading(false);
		};

		fetchOrder();
	}, [session_id]);

	return { data, loading, error };
};

export default useOrder;
