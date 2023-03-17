import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { getTranslatedOptions } from '@utils/translation';
import { MenuOptionProps } from '@ui/navigation/menu/Menu';

function useTranslatedMenuOptions(menuOptions: MenuOptionProps[]): MenuOptionProps[] {
	const { t, i18n } = useTranslation();
	const { language } = i18n;
	const [translatedOptions, setTranslatedOptions] = useState(menuOptions);

	useEffect(() => {
		const tO = getTranslatedOptions<MenuOptionProps>(t, menuOptions, 'label');
		setTranslatedOptions(tO);
	}, [language]);

	return translatedOptions;
}

export default useTranslatedMenuOptions;
