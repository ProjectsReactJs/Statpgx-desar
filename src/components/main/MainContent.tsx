import React from 'react';
import MuiContainer from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const Content = styled('main')(() => ({
	flexGrow: 1,
	height: '100vh',
	overflow: 'auto',
	backgroundColor: '#f3f3f3',
}));

const Container = styled(MuiContainer)(({ theme }) => ({
	paddingTop: theme.spacing(4),
	paddingBottom: theme.spacing(4),
	display: 'flex',
	flexDirection: 'column',
}));

export type MainContentProps = {};

const MainContent: React.FC<MainContentProps> = (props) => {
	const { children } = props;

	return (
		<Content>
			<Container maxWidth={false} sx={{ mt: { xs: '64px' }, height: { xs: `calc(100% - 64px)` } }}>
				{children}
			</Container>
		</Content>
	);
};

export default MainContent;
