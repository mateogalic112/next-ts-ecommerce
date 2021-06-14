import React from 'react';

import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import { Product } from '../../models/Product';
import Spacer from '../widgets/Spacer';

interface PaginatedListProps<T> {
	items: T[];
	render: (item: T) => React.ReactElement;
	lastPage: number;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginatedList = <T extends Product>({ items, render, lastPage, page, setPage }: PaginatedListProps<T>) => {
	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<>
			<Grid container spacing={5}>
				{items.map(render)}
			</Grid>
			<Spacer marginTop="2rem" />
			<Pagination count={lastPage} page={page} onChange={handlePageChange} />
		</>
	);
};

export default PaginatedList;
