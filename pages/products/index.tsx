import React, { useRef, useCallback } from 'react';
import useInfiniteLoading from '../../hooks/useInfiniteLoading';
import Image from 'next/image';
import { Product } from '../../models/Product';

import Layout from '../../src/components/Layout';
import ProductCard from '../../src/components/ProductCard';
import Spacer from '../../src/widgets/Spacer';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';

import { API_URL } from '../../config';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		heroWrapper: { position: 'relative', width: '100%', margin: 0, padding: 0 },
		paper: {
			padding: theme.spacing(4),
			margin: theme.spacing(7),
			maxWidth: 1200,
		},
	})
);

type ProductPageProps = {
	total: number;
};

const ProductsPage: React.FC<ProductPageProps> = ({ total }) => {
	const classes = useStyles();

	const { data, loading, error, size, setSize } = useInfiniteLoading('products');

	const observer = useRef<IntersectionObserver | null>(null);

	const hasMore = (data?.flat()?.length ?? total) < total;

	const lastItemRef = useCallback(
		(node: HTMLDivElement) => {
			if (loading) return;
			if (observer.current) {
				observer?.current?.disconnect();
			}
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setSize(size + 1);
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[loading, hasMore]
	);

	if (error) return <h1>Error</h1>;
	return (
		<Layout title="Products">
			<Container className={classes.heroWrapper}>
				<Image src="/product_homepage.jpg" alt="Product homepage" objectFit="cover" width={1200} height={600} />
			</Container>
			<Container>
				<Spacer />

				<Typography gutterBottom variant="h4" component="h3">
					ALL Products
				</Typography>
				<Spacer />

				{data &&
					data?.flat().map((product: Product, idx: number) => {
						const isLastElement = data?.flat().length === idx + 1;
						return (
							<div ref={isLastElement ? lastItemRef : null} key={product.name}>
								<ProductCard product={product} />
								<Spacer marginTop="2rem" />
							</div>
						);
					})}
				{loading && <div>Loading...</div>}
			</Container>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const total = await axios
		.get(`${API_URL}/products/count`)
		.then((r) => r.data)
		.catch((err) => {
			console.error(err);
		});

	return {
		props: {
			total,
		},
	};
};

export default ProductsPage;
