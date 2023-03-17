import * as React from 'react';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { Box, Icon } from '@mui/material';
import CardHeader from '@ui/surfaces/card/CardHeader';
import CardFooter from '@ui/surfaces/card/CardFooter';
import CardIcon from '@ui/surfaces/card/CardIcon';
import Card from '@ui/surfaces/card/Card';

const ScoreCardHeader = styled(CardHeader)(() => ({
	textAlign: 'right',
	flexGrow: 1,
}));

const ScoreCardFooter = styled(CardFooter)(() => ({
	marginTop: '20px',
	borderTop: '1px solid #eee',
}));

const ScoreCardTitle = styled('p')(() => ({
	color: '#999',
	margin: 0,
	fontSize: 14,
	marginTop: 0,
	paddingTop: 10,
	marginBottom: 0,
}));

const ScoreCardText = styled('h3')(() => ({
	fontSize: '1.825em',
	color: '#3C4858',
	marginTop: '0px',
	minHeight: 'auto',
	fontWeight: 300,
	marginBottom: '3px',
	textDecoration: 'none',
	'& small': {
		color: '#777',
		fontSize: '65%',
		fontWeight: 400,
		lineHeight: 1,
	},
}));

const ScoreCardFooterDescription = styled(Box)(() => ({
	color: '#999',
	display: 'inline-flex',
	fontSize: '12px',
	lineHeight: '22px',
	'& svg': {
		top: '4px',
		width: '16px',
		height: '16px',
		position: 'relative',
		marginRight: '3px',
	},
}));

export type ScoreCardProps = {
	backgroundColor: string;
	iconName: string;
	title: string;
	score: string;
	footer: React.ReactNode;
	sx?: SxProps<Theme> | undefined;
};

export default function (props: ScoreCardProps) {
	const { backgroundColor, iconName, title, score, footer, ...other } = props;
	return (
		<Card {...other}>
			<ScoreCardHeader>
				<CardIcon color={backgroundColor}>
					<Icon>{iconName}</Icon>
				</CardIcon>
				<ScoreCardTitle>{title}</ScoreCardTitle>
				<ScoreCardText>{score}</ScoreCardText>
			</ScoreCardHeader>
			<ScoreCardFooter>
				<ScoreCardFooterDescription>{footer}</ScoreCardFooterDescription>
			</ScoreCardFooter>
		</Card>
	);
}
