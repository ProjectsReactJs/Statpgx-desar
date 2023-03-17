import Medication from '@components/medications/Medications';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(`${locale}`, ['common'])),
        },
    };
};

export default function MedicationPage() {
    return <Medication />;
}

MedicationPage.auth = {
    roles: [],
    permissions: [],
};
