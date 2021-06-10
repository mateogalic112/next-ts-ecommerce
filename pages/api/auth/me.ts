import axios, { AxiosError, AxiosResponse } from 'axios';
import cookie from 'cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '../../../config';
import { User } from '../../../models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		if (!req.headers.cookie) {
			res.status(403).json({
				message: 'Not authorized!',
			});
			return;
		}

		const { token } = cookie.parse(req.headers.cookie);

		await axios
			.get<User | AxiosError>(`${API_URL}/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((r: AxiosResponse<User>) => {
				res.status(r.status).json({ user: r.data, jwt: token });
			})
			.catch((err: AxiosError) => {
				res.status(err.response?.status || 403).json({
					message: err.response?.data,
				});
			});
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
