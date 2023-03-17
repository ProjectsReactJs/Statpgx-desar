import * as React from 'react';
import { rgbToHex, alpha, lighten, styled, SxProps, Theme } from '@mui/material/styles';

export type GradientContainerProps = {
	color: string;
	children: React.ReactNode;
	sx?: SxProps<Theme> | undefined;
};

const GradientContainer = styled('div', {
	shouldForwardProp: (prop) => prop !== 'color',
})<GradientContainerProps>(({ color }) => ({
	background: `linear-gradient(60deg, ${rgbToHex(lighten(color, 0.25))}, ${color})`,
	boxShadow: `0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px ${alpha(color, 0.4)}`,
	padding: 15,
	borderRadius: 3,
}));

export default function (props: GradientContainerProps) {
	const { color, children, ...other } = props;
	return (
		<GradientContainer color={color} {...other}>
			{children}
		</GradientContainer>
	);
}
