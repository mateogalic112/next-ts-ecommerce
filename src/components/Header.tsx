import React, { useContext, useEffect } from 'react';
import Link from 'next/link';

import AnimatedDrawer from '../widgets/AnimatedDrawer';
import SearchBar from '../widgets/SearchBar';
import NavigationList from './NavigationList';
import ModalComponent from '../components/ModalComponent';

import theme from '../../theme';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, IconButton, Button, Container, TextField, Hidden, Box, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	drawerDiv: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	title: {
		flexGrow: 1,
		fontSize: '1.5rem',
	},
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
	white: {
		color: 'white',
	},
});

const Header: React.FC = () => {
	const classes = useStyles();

	const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
	const [showModal, setShowModal] = React.useState<boolean>(false);

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setIsDrawerOpen(open);
	};

	const openModal = () => setShowModal(true);

	return (
		<header>
			<AppBar position="static">
				<Container>
					<Toolbar disableGutters>
						<div className={classes.drawerDiv}>
							<IconButton
								onClick={toggleDrawer(true)}
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
							>
								<MenuIcon />
							</IconButton>
							<AnimatedDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
						</div>
						<Link href="/">
							<a className={classes.title}>E-commerce</a>
						</Link>
						<Hidden smDown>
							<NavigationList />
							<SearchBar />
						</Hidden>

						<Button onClick={openModal} color="inherit">
							Login
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
		</header>
	);
};

export default Header;
