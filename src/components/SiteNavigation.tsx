import React from 'react';

import Link from 'next/link';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import NavList from '../data/NavList';
import { NavListType } from '../data/NavList';

import SearchBar from '../widgets/SearchBar';

const SiteNavigation: React.FC = () => {
	return (
		<>
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
		</>
	);
};

export default SiteNavigation;
