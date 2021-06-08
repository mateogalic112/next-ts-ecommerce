import cookie from 'cookie';

import axios, { AxiosError } from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '../../../config';
import { User } from '../../../models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { username, email, password } = req.body;

		await axios
			.post<User>(`${API_URL}/auth/local/register`, {
				username,
				email,
				password,
			})
			.then((r) => {
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
				res.status(200).json({ user: r.data });
			})
			.catch((err: AxiosError) => {
				res.status(400).json({
					message: err.response?.data,
				});
			});
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
