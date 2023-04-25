import { Formik } from 'formik';
import { defaultClinicalAccountsValues } from './clinicalAccountsHelper';
import ClinicalAccountsFrom from './ClinicalAccountsFrom';
import useClinicals from '@src/hooks/useClinical';
import useDoctors from '@src/hooks/useDoctors';
import ClinicalPreviewDataDialog from './ClinicalPreviewDataDialog';
import { useEffect, useState } from 'react';
import { Clinical, Doctor } from 'types/interfaces';

const ClinicalAccounts = () => {
    const [showPreview, setShowPreview] = useState(false);
    const { clinicals: initialClinicals = [] } = useClinicals();
    const { doctors: initialDoctors = [] } = useDoctors();

    const [clinicals, setClinicals] = useState<Clinical[]>([]);

    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        setClinicals(initialClinicals)
    }, [JSON.stringify(initialClinicals)]);

    useEffect(() => {
        setDoctors(initialDoctors)
    }, [JSON.stringify(initialDoctors)]);

    return (
        <>
            <Formik
                initialValues={defaultClinicalAccountsValues}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {(props) => (<>
                    <ClinicalAccountsFrom
                        {...props}
                        clinicals={clinicals}
                        doctors={doctors}
                        onShowPreview={() => setShowPreview(true)}
                        onAddClinicalPractice={(clinical) => setClinicals(prevClinicals => [...prevClinicals, clinical])}
                        onAddDoctorPractice={(doctor) => setDoctors(prevDoctors => [...prevDoctors, doctor])}
                    />
                    <ClinicalPreviewDataDialog
                        values={props.values}
                        showPreview={showPreview}
                        onHidePreview={() => setShowPreview(false)}
                    />
                </>)}
            </Formik>
        </>

    )
};
export default ClinicalAccounts;
