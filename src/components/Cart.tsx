import React from 'react';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import { Box, Container, Typography } from '@material-ui/core';

const Cart: React.FC = () => {
	const { cartItems } = useTypedSelector((state) => state.cart);
	console.log(cartItems);

	return (
		<footer>
			<Box component="div" py={4}>
				<Container>
					<Box component="div"></Box>
				</Container>
			</Box>
		</footer>
	);
};

export default Cart;
