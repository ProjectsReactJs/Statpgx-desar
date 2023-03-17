import * as React from 'react';
import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { DRAWER_WIDTH } from '../navigation/sidebar/Sidebar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	button: {
		color: '#fff',
	},
	...(open && {
		marginLeft: DRAWER_WIDTH,
		width: `calc(100% - ${DRAWER_WIDTH}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export type HeaderProps = {
	isSidebarOpen: boolean;
	onToggleSidebar: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const Header: React.FC<HeaderProps> = (props) => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'));
	const { isSidebarOpen, onToggleSidebar, children } = props;

	return (
		<div>
			<AppBar position="fixed" open={isMd ? isSidebarOpen : false}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={onToggleSidebar}
						sx={{
							display: 'flex',
							...(isSidebarOpen && isMd && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					{children}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
