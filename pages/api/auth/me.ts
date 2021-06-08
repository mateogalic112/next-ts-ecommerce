import cookie from 'cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '../../../config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		if (!req.headers.cookie) {
			res.status(403).json({
				message: 'Not authorized!',
			});
			return;
		}

		const { token } = cookie.parse(req.headers.cookie);

		const strapiRes = await fetch(`${API_URL}/users/me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const user = await strapiRes.json();

		if (strapiRes.ok) {
			res.status(200).json({ user });
		} else {
			res.status(403).json({
				message: 'User forbidden!',
			});
		}
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
