import { useSWRInfinite } from 'swr';
import { API_URL } from '../config';

import fetcher from '../helpers/fetcher';
import { Product } from '../models/Product';

const useInfiniteLoading = (pathname: string, PER_PAGE: number = 3) => {
	const { data, error, size, setSize } = useSWRInfinite<Product[]>(
		(index) => `${API_URL}/${pathname}?_sort=published_at:ASC&_limit=${PER_PAGE}&_start=${index * PER_PAGE}`,
		fetcher
	);

	const loading = !data && !error;

	return {
		data,
		loading,
		error,
		size,
		setSize,
	};
};

export default useInfiniteLoading;
