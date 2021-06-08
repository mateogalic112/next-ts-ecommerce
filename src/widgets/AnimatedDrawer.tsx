import DrawerList from './DrawerList';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

type DrawerProps = {
	isDrawerOpen: boolean;
	toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const AnimatedDrawer: React.FC<DrawerProps> = ({ isDrawerOpen, toggleDrawer }) => {
	return (
		<SwipeableDrawer open={isDrawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
			<DrawerList toggleDrawer={toggleDrawer} />
		</SwipeableDrawer>
	);
};

export default AnimatedDrawer;
