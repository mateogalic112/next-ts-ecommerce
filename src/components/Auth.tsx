import React, { useEffect } from 'react';
import axios from 'axios';
import { NEXT_URL } from '../../config';

import useUser from '../../hooks/useUser';
import { User } from '../../models/User';

import ModalComponent from './ModalComponent';

import { Button, TextField } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import theme from '../../theme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	field: {
		margin: theme.spacing(1),
		width: 300,
	},
	loginButton: {
		margin: theme.spacing(1),
	},
});

type AuthProps = {
	open: boolean;
	closeModal: () => void;
};

const Auth: React.FC<AuthProps> = ({ open, closeModal }) => {
	const classes = useStyles();

	const [loading, setLoading] = React.useState(false);

	const loginUser = async (email: string, password: string): Promise<User | void> => {
		return await axios
			.post(`${NEXT_URL}/api/auth/login`, {
				identifier: email,
				password,
			})
			.then((response) => {
				return response.data as User;
			})
			.catch((err) => {
				console.log('req', err);
			});
	};

	const { userData, mutate, isValidating } = useUser();

	useEffect(() => {
		if (!loading && userData?.user) {
			closeModal();
		}
	}, [userData, loading]);

	// Handle login
	const [loginData, setLoginData] = React.useState({
		email: '',
		password: '',
	});

	const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const handleLoginDataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		await loginUser(loginData.email, loginData.password).then((_) => {
			setLoading(false);
		});
		mutate();
	};

	return (
		<ModalComponent open={open} handleClose={closeModal} title="Login" description="Login to see featured stuff">
			{loading || isValidating ? (
				<p>Loading</p>
			) : (
				<form onSubmit={handleLoginDataSubmit} className={classes.form} noValidate autoComplete="off">
					<TextField
						type="email"
						className={classes.field}
						id="outlined-basic-email"
						label="Email"
						variant="outlined"
						name="email"
						onChange={handleLoginFormChange}
					/>
					<TextField
						type="password"
						className={classes.field}
						id="outlined-basic-password"
						label="Password"
						variant="outlined"
						name="password"
						onChange={handleLoginFormChange}
					/>
					<Button
						type="submit"
						variant="contained"
						color="secondary"
						className={classes.loginButton}
						endIcon={<ExitToAppIcon />}
					>
						Login
					</Button>
				</form>
			)}
		</ModalComponent>
	);
};

export default Auth;
