import DrawerList from './DrawerList';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

type DrawerProps = {
	anchor: 'left' | 'right';
	isDrawerOpen: boolean;
	toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const AnimatedDrawer: React.FC<DrawerProps> = ({ anchor, isDrawerOpen, toggleDrawer, children }) => {
	return (
		<SwipeableDrawer anchor={anchor} open={isDrawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
			<DrawerList toggleDrawer={toggleDrawer}>{children}</DrawerList>
		</SwipeableDrawer>
	);
};

export default AnimatedDrawer;
