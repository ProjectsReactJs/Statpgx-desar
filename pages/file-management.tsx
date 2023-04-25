import { FileManagement } from '@components/fileManagement/FileManagement';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(`${locale}`, ['common'])),
        },
    };
};

export default function FileManagementPage() {
    return <FileManagement fileManagements={[]} />;
}

FileManagementPage.auth = {
    roles: [],
    permissions: [],
};
