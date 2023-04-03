import { useTranslation } from "next-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import { MedicationsFormValues } from "../medicationsHelper";
import { Doctors } from 'types/interfaces';
import { Insurance } from 'types/interfaces';
import MedicationsDoctorSectionForm from "./MedicationsDoctorSectionForm";

type MedicationsDoctorSectionProps = {
    data: MedicationsFormValues;
    onNext: (data: MedicationsFormValues) => void;
    doctors: Doctors[];
    insurance: Insurance[];
    onShowPreview: () => void;

}

const doctorSectionSchema = (t: (text: string) => string) => Yup.object().shape({
    doctorInfo: Yup.object().shape({
        doctorId: Yup.number().min(1, (t("validation.messages.required"))).required(t("validation.messages.required")),
        insuranceId: Yup.number().min(1, (t("validation.messages.required"))).required(t("validation.messages.required")),
    })
});

const MedicationsDoctorSection = (props: MedicationsDoctorSectionProps) => {
    const { data, onNext, doctors, insurance, onShowPreview } = props;

    const { t } = useTranslation();

    const onSubmit = async (values: MedicationsFormValues) => {
        onNext(values);
    };

    return (
        <Formik
            initialValues={data}
            onSubmit={onSubmit}
            validationSchema={doctorSectionSchema(t)}
            enableReinitialize
        >
            {(props) => (
                <MedicationsDoctorSectionForm {...props} onShowPreview={onShowPreview} doctors={doctors} insurance={insurance} onNext={onNext} />
            )}
        </Formik >
    )
}
export default MedicationsDoctorSection;