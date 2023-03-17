import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { getTranslatedOptions } from '../utils/translation';

function useColumnHeaders<R>(columns: R[]): R[] {
	const { t, i18n } = useTranslation();
	const { language } = i18n;
	const [translatedOptions, setTranslatedOptions] = useState(columns);

	useEffect(() => {
		const tO = getTranslatedOptions<R>(t, columns, 'headerName');
		setTranslatedOptions(tO);
	}, [language]);

	return translatedOptions;
}

export default useColumnHeaders;
