import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import { MedicationsFormValues } from "../medicationsHelper";
import { SexOption } from "types/interfaces";
import MedicationsPatientInfoSectionForm from "./MedicationsPatientInfoSectionForm";

const sexOptions: SexOption[] = [
    {
        value: 'F',
        label: 'Femenino',
    },
    {
        value: 'M',
        label: 'Masculino',
    },
    {
        value: 'OT',
        label: 'Otro',
    },
];

const medicationsPatientInfoSchema = (t: (text: string) => string) => Yup.object().shape({
    patientInfo: Yup.object().shape({
        firstName: Yup.string().matches(/^[a-zA-Z ]*$/, (t("validation.messages.alfa"))).required(t("validation.messages.required")).min(5, (t("validation.messages.firstName"))),
        lastName: Yup.string().matches(/^[a-zA-Z ]*$/, (t("validation.messages.alfa"))).required(t("validation.messages.required")).min(5, (t("validation.messages.lastName"))),
        address: Yup.string().required(t("validation.messages.required")).min(20, (t("validation.messages.address"))),
        telephone: Yup.string().matches(/^[+0-9]+$/, (t("validation.messages.alfa"))).required(t("validation.messages.required")).min(10, (t("validation.messages.telephone"))),
        email: Yup.string().email((t("validation.messages.format"))).required(t("validation.messages.required")),
        dateBirth: Yup.date().min(new Date('1900-01-01')).required(t("validation.messages.required")),
        sexAssig: Yup.mixed().oneOf(sexOptions.map(sex => sex.value), (t('validation.messages.sexAssig'))).required(t("validation.messages.required")),
        agreeToConsent: Yup.boolean().oneOf([true], t("validation.messages.required")),
        sign: Yup.mixed().required(t("validation.messages.sign")),
    })
});

type MedicationsPatientInfoSectionProps = {
    data: MedicationsFormValues;
    onPrev: (data: MedicationsFormValues) => void;
    onEnd: (data: MedicationsFormValues) => void;
    onShowPreview: () => void;
}

const MedicationsPatientInfoSection = (props: MedicationsPatientInfoSectionProps) => {
    const { data, onPrev, onEnd, onShowPreview } = props;

    const { t } = useTranslation();

    return (
        <>
            <Formik
                initialValues={data}
                validationSchema={medicationsPatientInfoSchema(t)}
                onSubmit={(values) => {
                    onEnd(values);
                    onShowPreview();
                }}
            >
                {(props) => (
                    <MedicationsPatientInfoSectionForm {...props} sexOptions={sexOptions} onPrev={onPrev} />
                )}
            </Formik>
        </>
    )
}

export default MedicationsPatientInfoSection;