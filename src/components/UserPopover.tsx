import React from 'react';

import { useRouter } from 'next/router';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Popover, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { ListItemProps } from '@material-ui/core/ListItem';
import { NEXT_URL } from '../../config';
import useUser from '../../hooks/useUser';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		typography: {
			padding: theme.spacing(1),
			fontSize: theme.typography.pxToRem(16),
		},
		white: {
			color: 'white',
		},
		listEl: {
			listStyle: 'none',
		},
	})
);

interface UserPopoverProps {
	username?: String;
}

const UserPopover: React.FC<UserPopoverProps> = ({ username }) => {
	const classes = useStyles();

	const router = useRouter();

	const { mutate } = useUser();

	const logoutUser = async () => {
		await axios.post(`${NEXT_URL}/api/auth/logout`).then((_) => {
			mutate();
			router.push('/');
		});
	};

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
		return <ListItem button component="a" {...props} />;
	}

	return (
		<div>
			<Button aria-describedby={id} onClick={handleClick} className={classes.white}>
				{username}
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<List component="nav" aria-label="user options">
					<ListItemLink onClick={logoutUser}>
						<ListItemText primary="Logout" className={classes.typography} />
					</ListItemLink>
				</List>
			</Popover>
		</div>
	);
};

export default UserPopover;
