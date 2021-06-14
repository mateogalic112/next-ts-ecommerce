import axios, { AxiosError, AxiosResponse } from 'axios';
import cookie from 'cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '../../../config';
import { Order } from '../../../models/Order';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		if (!req.headers.cookie) {
			res.status(403).json({
				message: 'Not authorized!',
			});
			return;
		}

		const { token } = cookie.parse(req.headers.cookie);

		const { checkout_session } = req.body;

		if (checkout_session) {
			await axios
				.post<Order | AxiosError>(
					`${API_URL}/orders/confirm`,
					{
						checkout_session,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((r: AxiosResponse<Order>) => {
					res.status(r.status).json({ order: r.data });
				})
				.catch((err: AxiosError) => {
					res.status(err.response?.status || 404).json({
						message: err.response?.data,
					});
				});
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
