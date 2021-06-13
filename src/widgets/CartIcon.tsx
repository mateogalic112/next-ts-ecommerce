import React from 'react';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import { IconButton, Badge } from '@material-ui/core';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			right: -3,
			top: 13,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: '0 4px',
		},
	})
)(Badge);

export default function CartIcon() {
	const { cartItems } = useTypedSelector((state) => state.cart);

	return (
		<IconButton aria-label="cart">
			<StyledBadge badgeContent={cartItems.length} color="secondary">
				<ShoppingCartIcon />
			</StyledBadge>
		</IconButton>
	);
}
