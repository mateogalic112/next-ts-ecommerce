import React from 'react';

import axios, { AxiosResponse } from 'axios';
import ImageGallery from 'react-image-gallery';

import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';

import { loadStripe } from '@stripe/stripe-js';

import { API_URL, STRIPE_PK } from '../../config';
import useUser from '../../hooks/useUser';

import { Product } from '../../models/Product';

import Layout from '../../src/components/Layout';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, ButtonBase, Container, Grid, Paper, Typography } from '@material-ui/core';

const stripePromise = loadStripe(STRIPE_PK);

type SingleProductProps = {
	product: Product;
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
		button: {
			display: 'block',
		},
	})
);

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
	const classes = useStyles();

	const images = product.gallery.map((pic) => ({
		original: pic.url,
		thumbnail: pic.formats?.thumbnail.url,
	}));

	const { userData } = useUser();

	const handleBuy = async () => {
		const stripe = await stripePromise;

		if (!stripe) {
			throw new Error('¨No stripe');
		}
		const response = await axios.post(
			`${API_URL}/orders`,
			{
				product: { id: product.id },
			},
			{
				headers: {
					Authorization: `Bearer ${userData.jwt}`,
				},
			}
		);

		const session = await response.data;

		await stripe.redirectToCheckout({
			sessionId: session.id,
		});
	};

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
							<Button
								onClick={handleBuy}
								className={classes.button}
								variant="contained"
								color="secondary"
							>
								Buy
							</Button>
						</Grid>
					</Grid>
				</Paper>
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
	const res: AxiosResponse<Product[]> = await axios.get(`${API_URL}/products`, {
		params: {
			slug: params?.slug,
		},
	});

	return {
		props: {
			product: res.data[0],
		},
	};
};

export default SingleProduct;
