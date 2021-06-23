import React from 'react';

import axios, { AxiosResponse } from 'axios';
import ImageGallery from 'react-image-gallery';

import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';

import { API_URL } from '../../config';

import { Product } from '../../models/Product';

import Layout from '../../src/components/Layout';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, ButtonBase, Container, Grid, Paper, Typography } from '@material-ui/core';
import ToCartButton from '../../src/widgets/ToCartButton';
import ReviewForm from '../../src/components/ReviewForm';
import ReviewList from '../../src/components/ReviewList';
import { Review } from '../../models/Review';

import qs from 'qs';
import useUserReview from '../../hooks/useUserReview';
import useSWR from 'swr';
import fetcher from '../../helpers/fetcher';

type SingleProductProps = {
	product: Product;
	reviews: Review[];
};

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

const SingleProduct: React.FC<SingleProductProps> = ({ product, reviews }) => {
	const classes = useStyles();

	const images = product.gallery.map((pic) => ({
		original: pic.url,
		thumbnail: pic.formats?.thumbnail.url,
	}));

	const query = qs.stringify({
		_where: [{ 'product.slug': product?.slug }],
	});

	const { data: productReviews } = useSWR(`${API_URL}/reviews?${query}`, fetcher, { initialData: reviews });

	const { canReview } = useUserReview(product._id, productReviews);

	return (
		<Layout title={product.name}>
			<Container className={classes.heroWrapper}>
				<video
					poster={product.cover.url}
					style={{ maxWidth: '100%' }}
					autoPlay
					loop
					muted
					src={product.video.url}
				></video>
				<Paper className={classes.paper}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<ButtonBase className={classes.image}>
								<Image height={300} width={300} alt={product.name} src={product.cover.url} />
							</ButtonBase>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography gutterBottom variant="h4">
								{product.name}
							</Typography>
							<Button size="small" variant="text" color="secondary">
								{product.category.title}
							</Button>
							<Typography gutterBottom variant="body2" color="textSecondary">
								{product.excerpt}
							</Typography>
							<Typography gutterBottom variant="h5">
								$19.00
							</Typography>
							<ToCartButton product={product} />
						</Grid>
					</Grid>
				</Paper>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<ReviewList reviews={productReviews} />
					</Grid>
				</Grid>
				{canReview && (
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<ReviewForm reviews={reviews} product={product._id} slug={product.slug} />
						</Grid>
					</Grid>
				)}
				<ImageGallery showPlayButton={false} items={images} />;
			</Container>
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const res: AxiosResponse<Product[]> = await axios.get(`${API_URL}/products`);

	const paths = res.data.map((product) => ({
		params: { slug: product.slug },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const productsResponse: Product[] = await axios
		.get(`${API_URL}/products`, {
			params: {
				slug: params?.slug,
			},
		})
		.then((res) => res.data);

	const query = qs.stringify({
		_where: [{ 'product.slug': params?.slug }],
	});

	const reviewsResponse: Review[] = await axios.get(`${API_URL}/reviews?${query}`).then((res) => res.data);

	const fetchProductData = async (): Promise<{
		products: Product[];
		reviews: Review[];
	}> => {
		try {
			const [products, reviews] = await Promise.all([productsResponse, reviewsResponse]);
			return {
				products,
				reviews,
			};
		} catch (err) {
			throw new Error('Failed to fetch data');
		}
	};

	const { products, reviews } = await fetchProductData();

	console.log(reviews);

	return {
		props: {
			product: products[0],
			reviews,
		},
	};
};

export default SingleProduct;
