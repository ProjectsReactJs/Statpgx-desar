import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { styled, alpha } from '@mui/material/styles';
import {
	List,
	ListItemButton as MuiListItemButton,
	ListItemButtonProps,
	ListItemIcon,
	ListItemText,
	Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavigationItemProps } from '@components/main/hooks/useNavigationOptions';

export type NavigationItemWithSubItemsLinkProps = {
	item: NavigationItemProps;
	onSelectNavigationItem: (option: NavigationItemProps) => void;
	selectedNavigationItem?: NavigationItemProps;
};

const ParentListItemButton = styled(MuiListItemButton, { shouldForwardProp: (prop) => prop !== 'selected' })<ListItemButtonProps>(
	({ theme, selected }) => ({
		...(selected && {
			backgroundColor: alpha(theme.palette.primary.main, 0.2),
		}),
	})
) as typeof MuiListItemButton;

const NavigationItemWithSubItemsLink: React.FC<NavigationItemWithSubItemsLinkProps> = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isChildSelected, setChildSelected] = useState(false);
	const { onSelectNavigationItem, item, selectedNavigationItem } = props;
	const { icon, text, subItems = [] } = item;

	const handleListItemClick = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const selectedSubItem = subItems?.find((subItem) => subItem.key === selectedNavigationItem?.key);
		setIsOpen(!!selectedSubItem);
		setChildSelected(!!selectedSubItem);
	}, [selectedNavigationItem]);

	return (
		<div>
			<ParentListItemButton onClick={handleListItemClick} title={text} selected={isChildSelected}>
				{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
				<ListItemText
					primaryTypographyProps={{
						variant: 'body2',
					}}
				>
					{text}
				</ListItemText>
				{isOpen ? <ExpandLess /> : <ExpandMore />}
			</ParentListItemButton>
			<Collapse in={isOpen} timeout={200}>
				<List component="div" disablePadding>
					{subItems.map((subItem, subItemIndex) => {
						const { icon: subItemIcon, text: subItemText, to: subItemTo, key: subItemKey } = subItem;
						const isSelected = selectedNavigationItem ? subItemKey === selectedNavigationItem.key : false;
						return (
							<Link href={subItemTo} passHref key={`navItem-subItem-${subItemIndex}`}>
								<MuiListItemButton
									component="a"
									onClick={() => {
										onSelectNavigationItem(subItem);
									}}
									title={subItemText}
									selected={isSelected}
								>
									<ListItemIcon>{subItemIcon}</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{
											variant: 'body2',
										}}
									>
										{subItemText}
									</ListItemText>
								</MuiListItemButton>
							</Link>
						);
					})}
				</List>
			</Collapse>
		</div>
	);
};

export default NavigationItemWithSubItemsLink;
