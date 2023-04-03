import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { Medication } from 'types/interfaces';
import { MedicationsFormValues } from "../medicationsHelper";
import { Formik } from 'formik';
import MedicationsMainSectionForm from './MedicationsMainSectionForm';

const mainSectionSchema = Yup.object().shape({
    medications: Yup.array().of(Yup.object().shape({
        medicationId: Yup.number().min(1).required(),
        conditionTreatmentId: Yup.number().min(1).required(),
        diagnosisId: Yup.number().min(1).required(),
    }))
});

type MedicationsMainSectionProps = {
    data: MedicationsFormValues;
    onNext: (data: MedicationsFormValues) => void;
    medications: Medication[];
    onShowPreview: () => void;
    onPrev: (data: MedicationsFormValues) => void;

}

const MedicationsMainSection = (props: MedicationsMainSectionProps) => {
    const { data, onNext, medications, onShowPreview, onPrev } = props;

    const { t } = useTranslation();

    const onSubmit = async (values: MedicationsFormValues) => {
        onNext(values);
    };

    return (
        <Formik
            initialValues={data}
            onSubmit={onSubmit}
            validationSchema={mainSectionSchema}
            enableReinitialize
        >
            {(props) => (
                <MedicationsMainSectionForm {...props} onShowPreview={onShowPreview} medications={medications} onPrev={onPrev} />
            )}
        </Formik >
    )
}

export default MedicationsMainSection;