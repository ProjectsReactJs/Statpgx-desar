import * as React from 'react';
import { useTranslation } from 'next-i18next';

export default function Dashboard() {
	const { t } = useTranslation();

	return <div>{t('dashboard.title')}</div>;
}
