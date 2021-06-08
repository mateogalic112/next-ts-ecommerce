import React from 'react';
import Link from 'next/link';

import NavList from '../data/NavList';

import { makeStyles } from '@material-ui/core/styles';

import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles({
	white: {
		color: 'white',
	},
});

const NavigationList = () => {
	const classes = useStyles();

	return (
		<Box component="div" p={1} display="flex">
			{NavList.map((item) => (
				<Link key={item.name} href={item.url} passHref>
					<Button className={classes.white}>{item.name}</Button>
				</Link>
			))}
		</Box>
	);
};

export default NavigationList;
