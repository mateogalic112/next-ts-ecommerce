import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, CircularProgress } from '@material-ui/core';

import Layout from '../src/components/Layout';
import Spacer from '../src/widgets/Spacer';
import useOrder from '../hooks/useOrder';

const useStyles = makeStyles({
	container: {
		minHeight: '80vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const SuccessPage: React.FC = () => {
	const classes = useStyles();

	const router = useRouter();
	const { session_id } = router.query;

	const { data, loading, error } = useOrder(session_id as string);

	return (
		<Layout title="Success">
			<Container className={classes.container}>
				{error && <p>{error}</p>}
				{loading && <CircularProgress />}
				{data?.order && (
					<>
						<Typography variant="h1">Success!</Typography>
						<Typography gutterBottom variant="h3">
							Thank you for your purchase!
						</Typography>
						<Typography gutterBottom variant="h5">
							Order: {data?.order?._id}
						</Typography>
						<Link href="/" passHref>
							<Button color="primary">Back to home</Button>
						</Link>
					</>
				)}
			</Container>
			<Spacer />
		</Layout>
	);
};

export default SuccessPage;
