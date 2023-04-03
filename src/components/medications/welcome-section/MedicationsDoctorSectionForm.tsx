import { Form as FormikForm, FormikProps, Field, FieldArray } from "formik";
import FormHeader from "@src/ui/forms/FormHeader";
import FormTitle from "@src/ui/forms/FormTitle";
import PreviewIcon from '@mui/icons-material/Preview';
import EastIcon from '@mui/icons-material/East';
import FormInnerContainer from "@src/ui/forms/FormInnerContainer";
import FormConainter from "@src/ui/forms/FormConainter";
import { Button, MenuItem, Grid } from '@mui/material';
import { TextField } from "@src/ui/forms/controls/TextField";
import { useTranslation } from "next-i18next";
import { MedicationsFormValues } from "../medicationsHelper";
import { Doctors } from "types/interfaces";
import { Insurance } from "types/interfaces";

type MedicationsDoctorSectionFormProps = FormikProps<MedicationsFormValues> & {
    doctors: Doctors[];
    insurance: Insurance[];
    onNext: (data: MedicationsFormValues) => void;
    onShowPreview: () => void;
};

export default function MedicationsDoctorSectionForm(props: MedicationsDoctorSectionFormProps) {
    const { doctors, insurance, onShowPreview } = props;
    const { t } = useTranslation();

    return (
        <>
            <FormikForm noValidate autoComplete="false">
                <FormHeader>
                    <FormTitle variant="h6" color="inherit" noWrap>
                        {t('doctorSure.title')}
                    </FormTitle>
                </FormHeader>
                <FormConainter>
                    <FormInnerContainer>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                {t('doctorSure.ConfirmYourDoctor')}
                            </Grid>
                            <Grid item xs={8}>
                                <Field
                                    fullWidth
                                    select
                                    id="doctorInfo.doctorId"
                                    name="doctorInfo.doctorId"
                                    label={t('doctorSure.ConfirmYourDoctor')}
                                    component={TextField}
                                    required
                                >
                                    {doctors.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {`${option.name} - ${option.specialty}`}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                {t('doctorSure.ConfirmYourInsurance')}
                            </Grid>
                            <Grid item xs={8}>
                                <Field
                                    fullWidth
                                    select
                                    id="doctorInfo.insuranceId"
                                    name="doctorInfo.insuranceId"
                                    label={t('doctorSure.ConfirmYourInsurance')}
                                    component={TextField}
                                    required
                                >
                                    {insurance.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>
                    </FormInnerContainer>
                </FormConainter>
                <Button
                    startIcon={<PreviewIcon />}
                    variant="outlined"
                    color='secondary'
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                    onClick={onShowPreview}
                >
                    {t('medication.form.actions.showPreview')}
                </Button>
                <Button
                    type="submit"
                    startIcon={<EastIcon />}
                    variant="contained"
                    color='primary'
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                >
                    {t('medication.next')}
                </Button>
            </FormikForm >
        </>
    )
}