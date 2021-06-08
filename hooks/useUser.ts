import useSWR from 'swr';
import { NEXT_URL } from '../config';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useUser() {
	const { data, mutate, error } = useSWR(`${NEXT_URL}/api/auth/me`, fetcher);

	const loading = !error && !data;

	return {
		loading,
		userData: data,
		mutate,
		error,
	};
}
