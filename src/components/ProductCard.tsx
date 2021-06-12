import React from 'react';
import Link from 'next/link';

import { useActions } from '../../hooks/useActions';
import { Product } from '../../models/Product';

import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import { getRating } from '../../helpers/getRatings';
import theme from '../../theme';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		padding: '0 1rem 1rem 1rem',
	},
	media: {
		height: 240,
		width: 200,
		margin: 'auto',
		backgroundSize: 'contain',
	},
	excerpt: {
		color: theme.palette.action.active,
	},
});

interface SinglePostProps {
	product: Product;
}

const PostCard: React.FC<SinglePostProps> = ({ product }) => {
	const classes = useStyles();

	const { addToCart } = useActions();

	const rating = getRating({ reviews: product.reviews });

	const addProductToCart = () => {
		addToCart(product, 1);
	};

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card className={classes.root}>
				<CardActionArea>
					<Link href={`/products/${product.slug}`}>
						<a>
							<CardMedia className={classes.media} image={product.cover.url} title={product.slug} />
						</a>
					</Link>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{product.name}
						</Typography>
						<Typography className={classes.excerpt} gutterBottom variant="body2">
							{product.excerpt}
						</Typography>
						<Typography gutterBottom variant="h6" component="h3">
							${product.price}
						</Typography>
						<Rating name="read-only" precision={0.5} value={rating} readOnly />
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button onClick={addProductToCart} size="small" color="primary" variant="contained">
						Add to Cart
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default PostCard;
