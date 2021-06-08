import React from 'react';

import ModalComponent from './ModalComponent';

import { Button, TextField } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import theme from '../../theme';
import { makeStyles } from '@material-ui/core/styles';
import useUser from '../../hooks/useUser';
import { NEXT_URL } from '../../config';

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

	const loginUser = async (email: string, password: string) => {
		await fetch(`${NEXT_URL}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				identifier: email,
				password,
			}),
		});
	};

	const { userData, loading, mutate } = useUser();

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
		await loginUser(loginData.email, loginData.password);
		mutate();
		if (!loading) {
			closeModal();
		}
	};

	return (
		<ModalComponent open={open} handleClose={closeModal} title="Login" description="Login to see featured stuff">
			{loading ? (
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
