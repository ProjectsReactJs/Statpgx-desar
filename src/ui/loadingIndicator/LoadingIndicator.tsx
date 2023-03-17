import { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const LoadingOverlay = styled('div')(() => ({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 103,
	backgroundColor: 'hsla(0,0%,100%,.875)',
}));

const LoadingIndicator = styled('div')(() => ({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 104,
	cursor: 'default',
}));

const LoadingSpinner = styled('div')(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	zIndex: 104,
	marginTop: `-${theme.spacing(2)}`,
	marginLeft: `-${theme.spacing(2.5)}`,
}));

const LoadingMessage = styled('div')(({ theme }) => ({
	color: `${theme.palette.primary.main}`,
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	position: 'absolute',
	width: '100%',
	textAlign: 'center',
	top: '50%',
	marginTop: theme.spacing(4.5),
	fontSize: '1.25em',
	textTransform: 'capitalize',
}));

export type LoadingIndicatorProps = {
	children: ReactNode;
};

export default function (props: LoadingIndicatorProps) {
	const { children } = props;
	return (
		<div>
			<LoadingOverlay />
			<LoadingIndicator>
				<LoadingSpinner>
					<CircularProgress />
				</LoadingSpinner>
				<LoadingMessage>{children}</LoadingMessage>
			</LoadingIndicator>
		</div>
	);
}
