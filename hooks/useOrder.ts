import useSWR from 'swr';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../config';
import { Order } from '../models/Order';

const fetcher = (url: string, session_id: string): Promise<Order> =>
	axios
		.post(url, {
			checkout_session: session_id,
		})
		.then((res) => res.data);

const useOrder = (session_id: string) => {
	const { data, error } = useSWR([`${API_URL}/orders/confirm`, session_id], fetcher);

	return {
		order: data,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useOrder;
