import { GetStaticProps } from 'next';
import Link from 'next/link';

import { API_URL } from '../config';

import { Container, Grid, Button, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Layout from '../src/components/Layout';
import ProductCard from '../src/components/ProductCard';
import Spacer from '../src/widgets/Spacer';
import Showcase from '../src/components/Showcase';

import { Product } from '../models/Product';
import { ShowcaseSingle } from '../models/ShowcaseSIngle';

interface HomePageProps {
	products: Product[];
	showcase: ShowcaseSingle;
}

const HomePage: React.FC<HomePageProps> = ({ products, children, showcase }) => {
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
