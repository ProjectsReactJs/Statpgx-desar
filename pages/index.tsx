import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Dashboard from '@components/dashboard/Dashboard';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { locale } = context;

	return {
		props: {
			...(await serverSideTranslations(`${locale}`, ['common'])),
		},
	};
};

export default function Home() {
	return <Dashboard />;
}

Home.auth = {
	roles: [],
	permissions: [],
};
