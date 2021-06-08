import React from 'react';

import theme from '../../theme';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Typography } from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles({
	root: {
		backgroundColor: theme.palette.neutral.main,
	},
	container: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	link: {
		marginLeft: '.75rem',
	},
});

const SocialIcons: React.FC = () => {
	const classes = useStyles();

	return (
		<Box display="flex" alignItems="center" color="primary">
			<a target="_blank" href="https://twitter.com/" rel="noopener noreferrer" className={classes.link}>
				<FacebookIcon />
			</a>
			<a target="_blank" href="https://twitter.com/" rel="noopener noreferrer" className={classes.link}>
				<InstagramIcon />
			</a>
			<a target="_blank" href="https://twitter.com/" rel="noopener noreferrer" className={classes.link}>
				<LinkedInIcon />
			</a>
		</Box>
	);
};

export default SocialIcons;
