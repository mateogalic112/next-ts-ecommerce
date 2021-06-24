import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import {
	Container,
	Typography,
	Button,
	CircularProgress,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@material-ui/core';
import Layout from '../src/components/Layout';
import Spacer from '../src/widgets/Spacer';
import { NEXT_URL } from '../config';

import useSWR from 'swr';
import fetcher from '../helpers/fetcher';
import { Order } from '../models/Order';
import { GetStaticProps } from 'next';
import axios from 'axios';

const useStyles = makeStyles({
	container: {
		minHeight: '80vh',
		padding: '2rem',
	},
});

const ProfilePage: React.FC = () => {
	const classes = useStyles();

	const { data: userData, error } = useSWR(`${NEXT_URL}/api/auth/me`, fetcher);
	const { data: orderData } = useSWR(`${NEXT_URL}/api/order/my`, fetcher);

	return (
		<Layout title="Success">
			<Container className={classes.container}>
				<h1>Profile Page</h1>
				<h2>Username: {userData?.user?.username}</h2>
				<Spacer />
				<Typography gutterBottom variant="h5" component="h6">
					Orders
				</Typography>
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Order ID</TableCell>
								<TableCell align="center">Status</TableCell>
								<TableCell align="center">Total</TableCell>
								<TableCell align="center">Order Date</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orderData?.order?.length > 0 &&
								orderData.order.map((order: Order) => (
									<TableRow key={order._id}>
										<TableCell component="th" scope="row">
											{order._id}
										</TableCell>
										<TableCell align="center">{order.status}</TableCell>
										<TableCell align="center">{order.total}$</TableCell>
										<TableCell align="center">
											{order.createdAt.toString().substring(0, 10)}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</Layout>
	);
};

export default ProfilePage;
