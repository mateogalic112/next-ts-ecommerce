import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { OrderDetail } from '../../models/Order';
import { useActions } from '../../hooks/useActions';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		boxShadow: 'none',
		paddingTop: '1rem',
	},
	media: {
		margin: 'auto',
		height: 100,
		width: 100,
		objectFit: 'contain',
	},
});

const CartItem: React.FC<OrderDetail> = ({ product, quantity }) => {
	const classes = useStyles();

	const { addToCart } = useActions();

	const [itemQuantity, setItemQuantity] = useState(quantity);

	const handleQtyChange = (operation: 'plus' | 'minus') => {
		if (operation === 'plus') {
			addToCart(product, itemQuantity + 1);
			setItemQuantity((itemQuantity) => itemQuantity + 1);
		} else {
			addToCart(product, itemQuantity - 1);
			setItemQuantity((itemQuantity) => itemQuantity - 1);
		}
	};

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={product.cover.formats?.thumbnail.url}
					title={product.name}
				/>
				<CardContent>
					<Typography gutterBottom variant="h6" component="h3">
						{product.name}
					</Typography>
					<Typography variant="h5" component="h2">
						${product.price}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					disabled={itemQuantity >= product.stock}
					onClick={() => handleQtyChange('plus')}
					size="small"
					color="primary"
					variant="outlined"
				>
					+
				</Button>
				<Typography color="primary" variant="body1" component="p">
					{itemQuantity}
				</Typography>
				<Button
					disabled={itemQuantity <= 1}
					onClick={() => handleQtyChange('minus')}
					size="small"
					color="primary"
					variant="outlined"
				>
					-
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;
