import React from 'react';

import { Box, Container, Typography } from '@material-ui/core';

const Cart: React.FC = () => {
	return (
		<footer>
			<Box component="div" py={4}>
				<Container>
					<Box component="div">
						<Typography variant="body2">Ecom &copy;</Typography>
						<Typography variant="subtitle2">All rights reserved {new Date().getFullYear()}.</Typography>
					</Box>
				</Container>
			</Box>
		</footer>
	);
};

export default Cart;
