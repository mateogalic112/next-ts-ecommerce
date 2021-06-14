import React from 'react';
import useInfiniteLoading from '../../hooks/useInfiniteLoading';
import Image from 'next/image';
import { Product } from '../../models/Product';

import Layout from '../../src/components/Layout';
import ProductCard from '../../src/components/ProductCard';
import Spacer from '../../src/widgets/Spacer';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		heroWrapper: { position: 'relative', width: '100%', margin: 0, padding: 0 },
		paper: {
			padding: theme.spacing(4),
			margin: theme.spacing(7),
			maxWidth: 1200,
		},
		image: {
			width: '100%',
			height: 'auto',
		},
	})
);

const ProductsPage: React.FC = () => {
	const classes = useStyles();

	const { data, loading, error, size, setSize } = useInfiniteLoading('products');

	if (loading) return <div>Loading...</div>;
	return (
		<Layout title="Products">
			<Container className={classes.heroWrapper}>
				<h1>Todo - images</h1>
			</Container>
			{data &&
				data?.flat().map((product: Product) => {
					return (
						<React.Fragment key={product.name}>
							<ProductCard product={product} />
							<Spacer marginTop="2rem" />
						</React.Fragment>
					);
				})}
			<button onClick={() => setSize(size + 1)}>Load More</button>
		</Layout>
	);
};

export default ProductsPage;
