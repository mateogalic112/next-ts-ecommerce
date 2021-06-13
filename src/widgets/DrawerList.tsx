import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

type DrawerListProps = {
	toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const DrawerList: React.FC<DrawerListProps> = ({ toggleDrawer, children }) => {
	const classes = useStyles();

	return (
		<div className={classes.list} role="presentation">
			{children}
		</div>
	);
};

export default DrawerList;
