import axios, { AxiosError, AxiosResponse } from 'axios';
import cookie from 'cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '../../../config';
import { User } from '../../../models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { identifier, password } = req.body;

		await axios
			.post<User | AxiosError>(`${API_URL}/auth/local`, {
				identifier,
				password,
			})
			.then((r: AxiosResponse<User>) => {
				res.setHeader(
					'Set-Cookie',
					cookie.serialize('token', r.data.jwt, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: 60 * 60 * 24 * 7, // week
						sameSite: 'strict',
						path: '/',
					})
				);
				res.status(r.status).json({ user: r.data });
			})
			.catch((err: AxiosError) => {
				res.status(err.response?.status || 404).json({
					message: err.response?.data,
				});
			});
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
