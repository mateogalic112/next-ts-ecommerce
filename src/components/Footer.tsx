import React from 'react';

import theme from '../../theme';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';

import SocialIcons from '../widgets/SocialIcons';

const useStyles = makeStyles({
	root: {
		backgroundColor: theme.palette.neutral.main,
	},
	container: {
		display: 'flex',
		justifyContent: 'space-between',
	},
});

const Footer = () => {
	const classes = useStyles();

	return (
		<footer>
			<Box component="div" py={4} className={classes.root}>
				<Container className={classes.container}>
					<Box component="div">
						<Typography variant="body2">Ecom &copy;</Typography>
						<Typography variant="subtitle2">All rights reserved {new Date().getFullYear()}.</Typography>
					</Box>
					<SocialIcons />
				</Container>
			</Box>
		</footer>
	);
};

export default Footer;
