import React from 'react';
import axios, { AxiosResponse } from 'axios';

import { API_URL, STRIPE_PK } from '../../config';
import useUser from '../../hooks/useUser';

import { loadStripe } from '@stripe/stripe-js';
import { OrderDetail } from '../../models/Order';
import { Button } from '@material-ui/core';

const stripePromise = loadStripe(STRIPE_PK);

type BuyButtonProps = {
	width?: string;
	cartItems: OrderDetail[];
};

const BuyButton: React.FC<BuyButtonProps> = ({ cartItems, width = 'initial' }) => {
	const { userData } = useUser();

	const handleBuy = async () => {
		const stripe = await stripePromise;

		if (!stripe) {
			throw new Error('¨No stripe');
		}
		const response = await axios.post(
			`${API_URL}/orders`,
			{
				cartItems,
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
		<Button style={{ width }} onClick={handleBuy} variant="contained" color="secondary">
			Checkout
		</Button>
	);
};

export default BuyButton;
