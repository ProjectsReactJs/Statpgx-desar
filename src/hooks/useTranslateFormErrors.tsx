import { FormikErrors } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

function useTranslateFormErrors<E>(errors: FormikErrors<E>): FormikErrors<E> {
	const { t, i18n } = useTranslation();
	const { language } = i18n;
	const [translatedErrors, setTranslatedErrors] = useState(errors);

	useEffect(() => {
		const translatedErrors: FormikErrors<E> = {};
		Object.keys(errors).forEach((fieldName) => {
			const errorName = errors[fieldName as keyof typeof errors];
			translatedErrors[fieldName as keyof typeof translatedErrors] = t(`${errorName}`);
		});
		setTranslatedErrors(translatedErrors);
	}, [language, errors]);

	return translatedErrors;
}

export default useTranslateFormErrors;
