import React from 'react';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import { useActions } from '../../hooks/useActions';

import { Button } from '@material-ui/core';
import { Product } from '../../models/Product';

type ToCartButtonProps = {
	product: Product;
};

const ToCartButton: React.FC<ToCartButtonProps> = ({ product }) => {
	const { cartItems } = useTypedSelector((state) => state.cart);
	const { addToCart } = useActions();

	const inCart = cartItems.find((item) => item.product.name === product.name);

	const addProductToCart = () => {
		addToCart(product, 1);
	};

	return (
		<>
			{inCart ? (
				<Button disabled size="small" variant="contained">
					In Cart
				</Button>
			) : (
				<Button onClick={addProductToCart} size="small" color="primary" variant="contained">
					Add to Cart
				</Button>
			)}
		</>
	);
};

export default ToCartButton;
