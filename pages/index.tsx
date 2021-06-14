import React, { useState } from 'react';

import { GetStaticProps } from 'next';
import Link from 'next/link';

import { API_URL } from '../config';

import { Container, Button, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Layout from '../src/components/Layout';
import ProductCard from '../src/components/ProductCard';
import Spacer from '../src/widgets/Spacer';
import Showcase from '../src/components/Showcase';

import { Product } from '../models/Product';
import { ShowcaseSingle } from '../models/ShowcaseSIngle';
import usePagination from '../hooks/usePagination';
import PaginatedList from '../src/components/PaginatedList';

interface HomePageProps {
	products: Product[];
	showcase: ShowcaseSingle;
}

const HomePage: React.FC<HomePageProps> = ({ products, children, showcase }) => {
	const [productsPage, setProductsPage] = useState(1);
	const { data, lastPage, loading, error } = usePagination('products', productsPage);

	// cache next page result
	usePagination('products', productsPage + 1);

	return (
		<Layout>
			<Showcase showcase={showcase} />
			<Container>
				<div>{children}</div>
			</Container>
			<Spacer />
			<Container>
				<Typography gutterBottom variant="h4" component="h3">
					New Products
				</Typography>
				{loading ? (
					<div>Loading...</div>
				) : (
					<PaginatedList
						items={data}
						render={(product: Product) => <ProductCard key={product.id} product={product} />}
						lastPage={lastPage}
						page={productsPage}
						setPage={setProductsPage}
					/>
				)}
				<Spacer />
				<Link href="/posts">
					<Button variant="contained" color="primary" endIcon={<ArrowForwardIosIcon />}>
						View All
					</Button>
				</Link>
			</Container>
			<Spacer />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const fetchData = async (): Promise<HomePageProps> => {
		try {
			const [showcase, products] = await Promise.all([
				await fetch(`${API_URL}/showcase`).then((r) => r.json()),
				await fetch(`${API_URL}/products?_sort=published_at:ASC&_limit=3`).then((r) => r.json()),
			]);
			return {
				showcase,
				products,
			};
		} catch (err) {
			throw new Error('Failed to fetch data');
		}
	};

	const { showcase, products } = await fetchData();

	return {
		props: {
			showcase,
			products,
		},
	};
};

export default HomePage;
