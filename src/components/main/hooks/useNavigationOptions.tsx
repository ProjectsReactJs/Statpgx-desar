import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/NoteAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MedicationIcon from '@mui/icons-material/Medication';
import FileManagementIcon from '@mui/icons-material/Description';
import { getTranslatedOptions } from '@utils/translation';

export type NavigationItemProps = {
	icon?: React.ReactElement;
	to: string;
	text: string;
	key: string;
	paths: string[];
	subItems?: NavigationItemProps[];
};

export type NavigationOptions = {
	subheader?: string;
	items: NavigationItemProps[];
};

function useNavigationOptions(): [NavigationOptions[], NavigationItemProps | undefined] {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const { language } = i18n;
	const { pathname } = router;
	const [navigationOptions, setNavigationOptions] = useState<NavigationOptions[]>([
		{
			items: [
				{
					icon: <DashboardRoundedIcon />,
					text: 'sidebar.navigationItems.dashboard',
					to: '/',
					paths: ['/'],
					key: 'sidebar.navigationItems.dashboard',
				},
				{
					icon: <MedicationIcon />,
					text: 'sidebar.navigationItems.medication',
					to: '/medications',
					paths: ['/medications'],
					key: 'sidebar.navigationItems.medication',
				},
				{
					icon: <FileManagementIcon />,
					text: 'sidebar.navigationItems.fileManagement',
					to: '/file-management',
					paths: ['/file-management'],
					key: 'sidebar.navigationItems.fileManagement',
				},
				{
					icon: <AddIcon />,
					text: 'sidebar.navigationItems.createClinicalAccounts',
					to: '/clinical-accounts',
					paths: ['/clinical-accounts'],
					key: 'sidebar.navigationItems.createClinicalAccounts',
				},
				{
					icon: <PersonAddIcon />,
					text: 'sidebar.navigationItems.createLogin',
					to: '/create-login',
					paths: ['/create-login'],
					key: 'sidebar.navigationItems.createLogin',
				},
				{
					icon: <SettingsRoundedIcon />,
					text: 'sidebar.navigationItems.settings',
					to: '/settings',
					paths: ['/settings'],
					key: 'sidebar.navigationItems.settings',
				},

			],
		},
	]);
	const [translatedOptions, setTranslatedOptions] = useState(navigationOptions);
	const [selectedOption, setSelectedOption] = useState<NavigationItemProps>();

	useEffect(() => {
		const translated: NavigationOptions[] = navigationOptions.map((nO) => {
			const { items, subheader } = nO;
			const translatedItems = getTranslatedOptions<NavigationItemProps>(t, items, 'text');

			return {
				...(subheader && { subheader: t(subheader) }),
				items: translatedItems.map(({ subItems, ...otherProps }) => {
					return {
						...otherProps,
						...(subItems && { subItems: getTranslatedOptions<NavigationItemProps>(t, subItems, 'text') }),
					};
				}),
			};
		});
		setTranslatedOptions(translated);
	}, [navigationOptions, language]);

	useEffect(() => {
		const items = translatedOptions
			.flatMap((tO) => tO.items)
			.reduce((translatedItems: NavigationItemProps[], currentItem) => {
				return currentItem.subItems?.length ? translatedItems.concat(currentItem.subItems) : translatedItems.concat(currentItem);
			}, []);

		const sO = items.find((option) => option.paths.includes(pathname)) || items[0];

		setSelectedOption(sO);
	}, [translatedOptions, pathname]);

	return [translatedOptions, selectedOption];
}

export default useNavigationOptions;
