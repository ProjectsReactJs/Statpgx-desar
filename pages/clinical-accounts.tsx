import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ClinicalAccounts from '@components/clinicalAccounts/ClinicalAccounts';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(`${locale}`, ['common'])),
        },
    };
};

export default function ClinicalAccountsPage() {
    return <ClinicalAccounts />;
}

ClinicalAccountsPage.auth = {
    roles: [],
    permissions: [],
};