import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { getTranslatedOptions } from '@utils/translation';
import { MenuOptionProps } from '@ui/navigation/menu/Menu';

const lngOptions = [
	{
		id: 'en',
		label: 'header.languages.english',
	},
	{
		id: 'es',
		label: 'header.languages.spanish',
	},
];

function useLocaleOptions(): [MenuOptionProps[], MenuOptionProps] {
	const { t, i18n } = useTranslation();
	const { language } = i18n;
	const [translatedOptions, setTranslatedOptions] = useState(lngOptions);
	const [selectedLocale, setSelectedLocale] = useState(lngOptions[0]);

	useEffect(() => {
		const tO = getTranslatedOptions<MenuOptionProps>(t, lngOptions, 'label');
		const selectedLocale = tO.find((translatedOption) => translatedOption.id === language) || tO[0];
		setTranslatedOptions(tO);
		setSelectedLocale(selectedLocale);
	}, [language]);

	return [translatedOptions, selectedLocale];
}

export default useLocaleOptions;
