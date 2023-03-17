import * as React from 'react';
import { styled, SxProps, Theme } from '@mui/material/styles';

export type CardFooterProps = {
	children: React.ReactNode;
	sx?: SxProps<Theme> | undefined;
};

const CardFooter = styled('div')(() => ({
	border: 0,
	margin: '0 15px 10px',
	display: 'flex',
	padding: 0,
	alignItems: 'center',
	paddingTop: '10px',
	borderRadius: 0,
	justifyContent: 'space-between',
	backgroundColor: 'transparent',
}));

export default function (props: CardFooterProps) {
	const { children, ...other } = props;
	return <CardFooter {...other}> {children}</CardFooter>;
}
