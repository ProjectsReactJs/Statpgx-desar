import { TFunction } from 'next-i18next';

export function getTranslatedOptions<R>(t: TFunction, options: R[], key: string): R[] {
	return options.map((option: any) => {
		const translatedValue = t(option[key]);
		return {
			...option,
			[key]: translatedValue,
		};
	});
}

export function setLocaleCookie(locale: string): void {
	document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
}
