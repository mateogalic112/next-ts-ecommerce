import useSWR from 'swr';
import { NEXT_URL } from '../config';

import fetcher from '../helpers/fetcher';

export default function useUser() {
	const { data, mutate, error, isValidating } = useSWR(`${NEXT_URL}/api/auth/me`, fetcher);

	const loading = !error && !data;

	return {
		loading,
		userData: data,
		mutate,
		error,
		isValidating,
	};
}
