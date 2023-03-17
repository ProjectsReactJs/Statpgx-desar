import * as React from 'react';
import { styled, SxProps, Theme } from '@mui/material/styles';

export type CardProps = {
	children: React.ReactNode;
	sx?: SxProps<Theme> | undefined;
};

const CardContainer = styled('div')(() => ({
	width: '100%',
	border: 0,
	display: 'flex',
	position: 'relative',
	fontSize: '.875rem',
	minWidth: 0,
	wordWrap: 'break-word',
	background: '#FFF',
	boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)',
	borderRadius: '6px',
	flexDirection: 'column',
}));

export default function (props: CardProps) {
	const { children } = props;
	return <CardContainer>{children}</CardContainer>;
}
