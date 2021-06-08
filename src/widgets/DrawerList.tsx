import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import NavList from '../data/NavList';
import { NavListType } from '../data/NavList';
import SearchBar from './SearchBar';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

type DrawerListProps = {
	toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const DrawerList: React.FC<DrawerListProps> = ({ toggleDrawer }) => {
	const classes = useStyles();

	return (
		<div className={classes.list} role="presentation">
			<List>
				{NavList.map((item: NavListType) => {
					return (
						<Link href={item.url} key={item.name}>
							<ListItem button>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.name} />
							</ListItem>
						</Link>
					);
				})}
			</List>
			<SearchBar />
		</div>
	);
};

export default DrawerList;
