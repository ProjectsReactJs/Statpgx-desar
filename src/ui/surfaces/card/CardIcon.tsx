import * as React from 'react';
import GradientContainer, { GradientContainerProps } from '@ui/container/GradientContainer';
import { styled, SxProps, Theme } from '@mui/material/styles';

export type CardIconProps = GradientContainerProps & {
	children: React.ReactNode;
	sx?: SxProps<Theme> | undefined;
};

const CardIcon = styled(GradientContainer)(() => ({
	float: 'left',
	marginTop: -20,
	marginRight: 15,
	backgroundColor: '#999',
}));

export default function (props: CardIconProps) {
	const { children, color, ...other } = props;
	return (
		<CardIcon color={color} {...other}>
			{children}
		</CardIcon>
	);
}
