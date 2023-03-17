import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export interface ConfirmationDialogProps extends DialogProps {
	title: string;
	description: any;
	confirmButtonLabel: string;
	cancelButtonLabel?: string;
	onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onConfirm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

// Create the dialog you want to use
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
	title,
	description,
	onCancel,
	onConfirm,
	confirmButtonLabel,
	cancelButtonLabel,
	...props
}) => (
	<Dialog {...props} TransitionComponent={Transition} aria-describedby="alert-dialog-content">
		<DialogTitle>{title}</DialogTitle>
		<DialogContent>
			{typeof description === 'string' ? (
				<DialogContentText id="alert-dialog-content">
					<span dangerouslySetInnerHTML={{ __html: description }}></span>
				</DialogContentText>
			) : (
				description
			)}
		</DialogContent>
		<DialogActions>
			{!!cancelButtonLabel && <Button onClick={onCancel}>{cancelButtonLabel}</Button>}
			<Button onClick={onConfirm}>{confirmButtonLabel}</Button>
		</DialogActions>
	</Dialog>
);

export default ConfirmationDialog;
