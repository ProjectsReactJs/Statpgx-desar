import { Formik } from "formik";
import { useTranslation } from "next-i18next";
import { Form as FormikForm, Field } from "formik";
import FormHeader from "@src/ui/forms/FormHeader";
import FormTitle from "@src/ui/forms/FormTitle";
import FormInnerContainer from "@src/ui/forms/FormInnerContainer";
import FormConainter from "@src/ui/forms/FormConainter";
import MedicationsSummaryAccordion from "./MedicationsSummaryAccordion";
import { Box, Button, MenuItem } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { TextField } from "@src/ui/forms/controls/TextField";
import { MedicationsFormValues } from "../medicationsHelper";

type MedicationsOutputSectionProps = {
    data: MedicationsFormValues;
    onPrev: (data: MedicationsFormValues) => void;
    onNext: (data: MedicationsFormValues) => void;
}

const MedicationsOutputSection = (props: MedicationsOutputSectionProps) => {
    const { data, onPrev, onNext } = props;

    const { t } = useTranslation();

    return <Formik
        initialValues={data}
        onSubmit={onNext}
    >
        {({ values }) => (
            <FormikForm noValidate autoComplete="false">
                <FormHeader>
                    <FormTitle variant="h6" color="inherit" noWrap>
                        {t('medication.info')}
                    </FormTitle>
                </FormHeader>

                <FormConainter>
                    <FormInnerContainer>
                        <Field
                            fullWidth
                            select
                            id={`currentMedicationIndex`}
                            name={`currentMedicationIndex`}
                            label={t('medication.form.fields.medicationName')}
                            component={TextField}
                            required
                        >
                            {values.medicationsFullInfo.map((medicationInfo, index) => (
                                <MenuItem key={index} value={index}>
                                    {`${medicationInfo.medication.label}`}
                                </MenuItem>
                            ))}
                        </Field>
                    </FormInnerContainer>
                </FormConainter>
                <FormConainter>
                    <FormInnerContainer >
                        <Box style={{ fontSize: '18px' }}>
                            <span style={{ fontWeight: 'bold' }}>{t('medication.name')}:</span> {(values.medicationsFullInfo[values.currentMedicationIndex].medication.label)}
                        </Box>
                        <Box style={{ fontSize: '18px' }}>
                            <span style={{ fontWeight: 'bold' }}>{t('medication.condition')}:</span> {`${(values.medicationsFullInfo[values.currentMedicationIndex].conditionTreatment.name)} - ${(values.medicationsFullInfo[values.currentMedicationIndex].conditionTreatment.description)}`}
                        </Box>
                        <Box style={{ fontSize: '18px' }}>
                            <span style={{ fontWeight: 'bold' }}>{t('medication.diagnosis')}:</span> {`${(values.medicationsFullInfo[values.currentMedicationIndex].diagnosis.code)} - ${(values.medicationsFullInfo[values.currentMedicationIndex].diagnosis.description)}`}
                        </Box>
                    </FormInnerContainer>
                    <MedicationsSummaryAccordion id={values.medications[values.currentMedicationIndex].medicationId} />

                </FormConainter>

                <Button
                    startIcon={<KeyboardBackspaceIcon />}
                    variant="contained"
                    color='secondary'
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                    onClick={() => onPrev(values)}
                >
                    {t('medication.goback')}
                </Button>
                <Button
                    startIcon={<EastIcon />}
                    type="submit"
                    variant="contained"
                    color='primary'
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                >
                    {t('medication.next')}
                </Button>
            </FormikForm>
        )}
    </Formik >
}

export default MedicationsOutputSection;