import React from 'react';
import Link from 'next/link';

import AnimatedDrawer from '../widgets/AnimatedDrawer';
import SearchBar from '../widgets/SearchBar';
import NavigationList from './NavigationList';

import theme from '../../theme';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, IconButton, Button, Container, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import useUser from '../../hooks/useUser';
import UserPopover from './UserPopover';
import Auth from './Auth';

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
		fontSize: '1.5rem',
		marginRight: 'auto',
	},
	white: {
		color: 'white',
	},
});

const Header: React.FC = () => {
	const classes = useStyles();

	// Auth Modal
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	const { userData } = useUser();

	// Side drawer
	const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
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

						{userData?.user ? (
							<UserPopover username={userData.user?.username} />
						) : (
							<Button onClick={openModal} color="inherit">
								Login
							</Button>
						)}
					</Toolbar>
				</Container>
			</AppBar>
			<Auth open={showModal} closeModal={closeModal} />
		</header>
	);
};

export default Header;
