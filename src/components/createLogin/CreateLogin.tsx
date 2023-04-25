import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import userLogins from '@src/hooks/useLogins';
import { defaultUserDataValues, userDefaultValues } from './portalLoginDataHelper';
import { User } from 'types/interfaces';
import PortalLoginForm from './PortalLoginForm';
import useClinicals from '@src/hooks/useClinical';
import useDoctors from '@src/hooks/useDoctors';
import PortalPreviewDataDialog from './PortalPreviewDataDialog';

const CreateLogin = () => {
    const [showPreview, setShowPreview] = useState(false);
    const { users: initialUsers = [] } = userLogins();
    const [users, setUsers] = useState<User[]>([]);
    const { clinicals = [] } = useClinicals();
    const { doctors = [] } = useDoctors();

    useEffect(() => {
        setUsers(initialUsers)
    }, [JSON.stringify(initialUsers)]);

    return (
        <>
            <Formik
                initialValues={defaultUserDataValues}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {(props) => (<>
                    <PortalLoginForm
                        {...props}
                        users={users}
                        doctors={doctors}
                        clinicals={clinicals}
                        onShowPreview={() => setShowPreview(true)}
                        onAddLoginUser={(user) => setUsers(prevUsers => [...prevUsers, user])}
                    />
                    <PortalPreviewDataDialog
                        values={props.values}
                        showPreview={showPreview}
                        onHidePreview={() => setShowPreview(false)}
                    />
                </>)}
            </Formik>
        </>

    )
};
export default CreateLogin;