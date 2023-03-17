import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import { SnackbarProvider } from 'notistack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Sidebar from '@ui/navigation/sidebar/Sidebar';
import Header from '@ui/header/Header';
import MainContent from './MainContent';
import NavigationList from './NavigationList';
import logo from '../../assets/images/statpgx-logo.png';

const Root = styled('div')(() => ({
	display: 'flex',
	'.analyticsReport': {
		flexGrow: 1,
	},
}));

const Footer = styled('footer')(({ theme }) => ({
	position: 'relative',
	marginTop: 15,
	bottom: 0,
	borderTop: '1px solid #e7e7e7',
	fontWeight: 300,
	lineHeight: '1.5em',
}));

const FooterText = styled('p')(() => ({
	float: 'right',
	margin: 0,
	padding: '15px',
	fontSize: '14px',
}));


export type PageProps = {};

const Page: React.FC<PageProps> = (props) => {
	const { children } = props;
	const { t } = useTranslation();
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.up('md'));
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	useEffect(() => {
		setIsSidebarOpen(isSm);
	}, [isSm]);

	const onToggleSidebar = (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<SnackbarProvider
			maxSnack={1}
			anchorOrigin={{
				horizontal: 'center',
				vertical: 'top',
			}}
		>
			<Root>
				<Header isSidebarOpen={isSidebarOpen} onToggleSidebar={onToggleSidebar}>
					<Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
						<Image src={logo} alt="statpgx" height={60} width={200} />
					</Box>
				</Header>
				<Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={onToggleSidebar}>
					<NavigationList />
				</Sidebar>
				<MainContent>
					<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</Box>
					<Footer>
						<FooterText>
							&copy; {new Date().getFullYear()} {t('footer.copyright')}
						</FooterText>
					</Footer>
				</MainContent>
			</Root>
		</SnackbarProvider>
	);
};

export default Page;
