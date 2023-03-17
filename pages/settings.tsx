import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Settings from '@src/components/settings/Settings';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { locale } = context;

	return {
		props: {
			...(await serverSideTranslations(`${locale}`, ['common'])),
		},
	};
};

export default function SettingsPage() {
	return <Settings />;
}

SettingsPage.auth = {
	roles: [],
	permissions: [],
};
