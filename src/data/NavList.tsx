import { SvgIconProps } from '@material-ui/core/SvgIcon';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import React from 'react';

export type NavListType = {
	name: string;
	icon: React.ReactElement<SvgIconProps>;
	url: string;
};

const NavList: NavListType[] = [
	{
		name: 'Home',
		icon: <HomeOutlinedIcon />,
		url: '/',
	},
	{
		name: 'Products',
		icon: <BookOutlinedIcon />,
		url: '/products',
	},
];

export default NavList;
