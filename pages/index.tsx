import { GetStaticProps } from 'next';
import Link from 'next/link';

import { API_URL } from '../config';

import { Container, Grid, Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Layout from '../src/components/Layout';
import ProductCard from '../src/components/ProductCard';
import Spacer from '../src/widgets/Spacer';

import { Product } from '../models/Product';

interface HomePageProps {
	token: String | undefined;
	products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ token, products, children }) => {
	return (
		<Layout>
			{/* <Showcase /> */}
			<Container>
				<div>{children}</div>
			</Container>
			<Spacer />
			<Container>
				<h2>New Products</h2>
				<Grid container spacing={5}>
					{products.map((product) => (
						<ProductCard key={product.slug} product={product} />
					))}
				</Grid>
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
	const res = await fetch(`${API_URL}/products`);

	const products = await res.json();

	return {
		props: {
			products,
		},
	};
};

export default HomePage;
