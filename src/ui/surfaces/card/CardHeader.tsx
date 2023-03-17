import * as React from 'react';
import { styled, SxProps, Theme } from '@mui/material/styles';

export type CardHeaderProps = {
	children: React.ReactNode;
	sx?: SxProps<Theme> | undefined;
};

const CardHeader = styled('div')(() => ({
	background: 'transparent',
	boxShadow: 'none',
	borderRadius: 'calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0',
	color: '#FFF',
	margin: '0 15px',
	padding: 0,
	position: 'relative',
	'& .MuiIcon-root': {
		width: '56px',
		height: '56px',
		overflow: 'unset',
		fontSize: '36px',
		textAlign: 'center',
		lineHeight: '56px',
		marginBottom: 1,
	},
	'& .MuiSvgIcon-root': {
		width: '24px',
		height: '24px',
		margin: '5px 4px 0px',
		textAlign: 'center',
		lineHeight: '33px',
	},
}));

export default function (props: CardHeaderProps) {
	const { children, ...other } = props;
	return <CardHeader {...other}> {children}</CardHeader>;
}
