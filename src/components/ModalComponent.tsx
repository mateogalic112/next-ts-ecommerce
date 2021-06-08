import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal, Fade, Backdrop } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
		description: {
			fontSize: '1rem',
		},
		title: {
			fontSize: '1.5rem',
		},
	})
);

interface ModalProps {
	open: boolean;
	handleClose(): void;
	title: string;
	description?: String;
}

const ModalComponent: React.FC<ModalProps> = ({ open, handleClose, title, description, children }) => {
	const classes = useStyles();

	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const modalContent = open ? (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<div className={classes.paper}>
					<h2 className={classes.title} id="transition-modal-title">
						{title}
					</h2>
					{description && (
						<p className={classes.description} id="transition-modal-description">
							{description}
						</p>
					)}
					{children}
				</div>
			</Fade>
		</Modal>
	) : null;

	if (isBrowser) {
		return ReactDOM.createPortal(modalContent, document.getElementById('modal-root') as Element);
	} else {
		return null;
	}
};

export default ModalComponent;
