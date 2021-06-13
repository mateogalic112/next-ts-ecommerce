import React from 'react';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import { Box, Container, IconButton, Divider, Typography, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AnimatedDrawer from '../widgets/AnimatedDrawer';
import CartIcon from '../widgets/CartIcon';
import CartItem from './CartItem';
import theme from '../../theme';
import Spacer from '../widgets/Spacer';
import BuyButton from '../widgets/BuyButton';

const useStyles = makeStyles({
	price: {
		color: theme.palette.primary.main,
	},
});

const Cart: React.FC = () => {
	const classes = useStyles();

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
						<Typography variant="h6" component="h4">
							Items:{' '}
							<span className={classes.price}>
								{cartItems.reduce((acc, item) => acc + item.quantity, 0)}
							</span>
						</Typography>
						<Spacer marginTop=".5rem" />
						{cartItems.map((item) => (
							<React.Fragment key={item.id}>
								<CartItem {...item} />
								<Divider light />
							</React.Fragment>
						))}
						<Divider light />
						<Spacer marginTop="1rem" />
						<Typography variant="h5" component="h3">
							Total:{' '}
							<span className={classes.price}>
								$
								{cartItems
									.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
									.toFixed(2)}
							</span>
						</Typography>
						<Spacer marginTop=".5rem" />
						<BuyButton width="100%" cartItems={cartItems} />
					</AnimatedDrawer>
				</Container>
			</Box>
		</>
	);
};

export default Cart;
