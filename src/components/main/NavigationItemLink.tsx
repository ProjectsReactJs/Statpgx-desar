import React from 'react';
import Link from 'next/link';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavigationItemProps } from '@components/main/hooks/useNavigationOptions';

export type NavigationItemLinkProps = {
	item: NavigationItemProps;
	onSelectNavigationItem: (option: NavigationItemProps) => void;
	selectedNavigationItem?: NavigationItemProps;
};

const NavigationItemLink: React.FC<NavigationItemLinkProps> = (props) => {
	const { onSelectNavigationItem, item, selectedNavigationItem } = props;
	const { icon, text, to, key } = item;
	const isSelected = selectedNavigationItem ? key === selectedNavigationItem.key : false;
	return (
		<Link href={to} passHref>
			<ListItemButton
				component="a"
				onClick={() => {
					onSelectNavigationItem(item);
				}}
				title={text}
				selected={isSelected}
			>
				{icon ? <ListItemIcon sx={{ minWidth: { xs: 40, sm: 52 } }}>{icon}</ListItemIcon> : null}
				<ListItemText
					primaryTypographyProps={{
						variant: 'body2',
					}}
				>
					{text}
				</ListItemText>
			</ListItemButton>
		</Link>
	);
};

export default NavigationItemLink;
