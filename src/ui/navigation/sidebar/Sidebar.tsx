import React, { FunctionComponent, ReactChild, ReactChildren } from 'react';
import { Drawer as MuiDrawer, IconButton, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const DRAWER_WIDTH = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: DRAWER_WIDTH,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
	width: DRAWER_WIDTH,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	[theme.breakpoints.up('sm')]: {
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	},
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

export type SidebarProps = {
	children: ReactChild | ReactChildren;
	isSidebarOpen: boolean;
	onToggleSidebar: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const Sidebar: FunctionComponent<SidebarProps> = (props: SidebarProps) => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'));
	const { children, onToggleSidebar, isSidebarOpen } = props;

	return (
		<Drawer
			variant={isMd ? 'permanent' : 'temporary'}
			anchor="left"
			open={isSidebarOpen}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
			onClose={onToggleSidebar}
		>
			<DrawerHeader>
				{isMd && (
					<IconButton onClick={onToggleSidebar}>
						<ChevronLeftIcon />
					</IconButton>
				)}
			</DrawerHeader>
			<Divider />
			{children}
		</Drawer>
	);
};

export default Sidebar;
