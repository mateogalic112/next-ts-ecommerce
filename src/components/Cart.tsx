import React from 'react';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import { Box, Container, IconButton, Typography } from '@material-ui/core';

import AnimatedDrawer from '../widgets/AnimatedDrawer';
import CartIcon from '../widgets/CartIcon';

const Cart: React.FC = () => {
	const { cartItems } = useTypedSelector((state) => state.cart);

	// Cart drawer
	const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setIsDrawerOpen(open);
	};

	return (
		<>
			<IconButton onClick={toggleDrawer(true)} edge="end" color="inherit" aria-label="cart">
				<CartIcon />
			</IconButton>
			<Box component="div" py={4}>
				<Container>
					<AnimatedDrawer anchor="right" isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
						{cartItems.map((item) => (
							<li key={item.id}>item.product.name</li>
						))}
					</AnimatedDrawer>
				</Container>
			</Box>
		</>
	);
};

export default Cart;
