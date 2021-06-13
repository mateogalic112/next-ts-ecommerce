import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';

const useStyles = makeStyles({
	list: {
		width: 250,
		padding: theme.spacing(2),
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
