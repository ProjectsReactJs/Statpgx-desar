import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { List, Divider, ListSubheader } from '@mui/material';
import useNavigationOptions, { NavigationItemProps } from '@components/main/hooks/useNavigationOptions';
import NavigationItemLink from './NavigationItemLink';
import NavigationItemWithSubItemsLink from './NavigationItemWithSubItemsLink';

export type NavigastionListProps = {};

const NavigationList: React.FC<NavigastionListProps> = () => {
	const [navigationItems, selectedNavigationItem] = useNavigationOptions();
	const router = useRouter();

	const onSelectNavigationItem = async (option: NavigationItemProps) => {
		if (selectedNavigationItem && option.key !== selectedNavigationItem.key) {
			const { key } = option;
			switch (key) {
				case 'sidebar.navigationItems.logout': {
					const response = await signOut({ redirect: false, callbackUrl: '/auth/signin' });
					router.push(response.url);
					break;
				}
				default: {
					if (option.to) {
						router.push(option.to);
					}
					break;
				}
			}
		}
	};

	return (
		<div>
			{navigationItems.map((navItem, navIndex) => {
				const { subheader, items } = navItem;

				return (
					<List key={`navItem-${navIndex}`} component="nav">
						{navIndex !== 0 && <Divider />}
						{subheader && <ListSubheader inset>{subheader}</ListSubheader>}
						{items.map((item, itemIndex) => {
							if (item.subItems && item.subItems.length) {
								return (
									<NavigationItemWithSubItemsLink
										item={item}
										selectedNavigationItem={selectedNavigationItem}
										onSelectNavigationItem={onSelectNavigationItem}
										key={`navItem-${navIndex}-${itemIndex}`}
									/>
								);
							} else {
								return (
									<NavigationItemLink
										item={item}
										selectedNavigationItem={selectedNavigationItem}
										onSelectNavigationItem={onSelectNavigationItem}
										key={`navItem-${navIndex}-${itemIndex}`}
									/>
								);
							}
						})}
					</List>
				);
			})}
		</div>
	);
};

export default NavigationList;
