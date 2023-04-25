import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreateLogin from '@components/createLogin/CreateLogin';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(`${locale}`, ['common'])),
        },
    };
};

export default function CreateLoginPage() {
    return <CreateLogin />;
}

CreateLoginPage.auth = {
    roles: [],
    permissions: [],
};