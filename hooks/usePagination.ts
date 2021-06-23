import useSWR from 'swr';
import fetcher from '../helpers/fetcher';
import { API_URL } from '../config';

export default function usePagination(pathname: string, page: number, PER_PAGE: number = 3, initialData?: any) {
	const start = Number(page) === 1 ? 0 : (Number(page) - 1) * PER_PAGE;

	const { data, error: errorProducts } = useSWR(
		`${API_URL}/${pathname}?_sort=published_at:ASC&_limit=${PER_PAGE}&_start=${start}`,
		fetcher,
		{ initialData: initialData ? initialData.slice(0, PER_PAGE) : undefined }
	);

	const { data: total, error: errorTotal } = useSWR(`${API_URL}/${pathname}/count`, fetcher);

	const loading = (!errorProducts && !data) || (!total && !errorTotal);
	const error = (!loading && !data) || (!loading && !total);

	const lastPage = Math.ceil(total / PER_PAGE);

	return {
		lastPage,
		data,
		loading,
		error,
	};
}
