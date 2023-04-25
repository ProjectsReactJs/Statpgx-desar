import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem } from "@mui/material";
import { Field, Form as FormikForm, Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import QueueIcon from '@mui/icons-material/Queue';
import * as Yup from "yup";
import { TextField } from "@src/ui/forms/controls/TextField";
import { TestingTypes } from "types/interfaces";
import { DoctorFormValues, doctorDefaultValues } from "./clinicalAccountsHelper";

const testingTypes: TestingTypes[] = [
    {
        label: 'Hereditary Cancer Risk',
    },
    {
        label: 'Carrier Disease Risk',
    },
    {
        label: 'Non-Invasive Prenatal',
    },
    {
        label: 'Pharmacogenomics',
    },
    {
        label: 'Cardiovascular NGS',
    },
    {
        label: 'Diabetes NGS',
    },
];

const doctorSchema = (t: (text: string) => string) => Yup.object().shape({
    doctorFirstName: Yup.string().matches(/^[a-zA-Z ]*$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(5, (t("validation.messages.messages.required"))),
    doctorLastName: Yup.string().matches(/^[a-zA-Z ]*$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(5, (t("validation.messages.messages.required"))),
    npiNumber: Yup.string().matches(/^[+0-9 ]+$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(2, (t("validation.messages.required"))),
    practiceAddressLineOne: Yup.string().matches(/^[a-zA-Z0-9 ]*$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(5, (t("validation.messages.messages.required"))),
    practiceAddressLineDos: Yup.string().matches(/^[a-zA-Z0-9 ]*$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(5, (t("validation.messages.messages.required"))),
    speciality: Yup.string().matches(/^[a-zA-Z ]*$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(5, (t("validation.messages.messages.required"))),
    designation: Yup.string().matches(/^[a-zA-Z0-9 ]*$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(5, (t("validation.messages.messages.required"))),
    testingTypes: Yup.mixed().oneOf(testingTypes.map(sex => sex.label), (t('validation.messages.sexAssig'))).required(t("validation.messages.required")),
})

type DoctorFormDialogProps = {
    show: boolean;
    onClose: () => void;
    onSubmit: (values: DoctorFormValues, formikHelpers: FormikHelpers<DoctorFormValues>) => void | Promise<void>
}

const DoctorFormDialog = (props: DoctorFormDialogProps) => {
    const { show, onClose, onSubmit } = props;
    const { t } = useTranslation();

    return (
        <Dialog
            open={show}
            onClose={onClose}
            aria-labelledby="medication-preview-title"
            aria-describedby="medication-dialog-description"
            fullWidth
            maxWidth={'md'}
        >
            <DialogTitle id="medication-preview-title">
                {t('createPracticeClinical.addDoctor')}
            </DialogTitle>
            <DialogContent>
                <Formik
                    validationSchema={doctorSchema(t)}
                    initialValues={doctorDefaultValues}
                    onSubmit={onSubmit}
                >
                    {() => <FormikForm noValidate autoComplete="false">
                        <Grid container spacing={2} >
                            <Grid item xs={6}>
                                {t('createPracticeClinical.doctorFirstName')}
                                <Field
                                    name="doctorFirstName"
                                    id="doctorFirstName"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.doctorFirstName')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('createPracticeClinical.doctorLastName')}
                                <Field
                                    name="doctorLastName"
                                    id="doctorLastName"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.doctorLastName')}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                {t('createPracticeClinical.npiNumber')}
                                <Field
                                    name="npiNumber"
                                    id="npiNumber"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.npiNumber')}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                {t('createPracticeClinical.addressLineOne')}
                                <Field
                                    name="practiceAddressLineOne"
                                    id="practiceAddressLineOne"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.addressLineOne')}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                {t('createPracticeClinical.addressLineDos')}
                                <Field
                                    name="practiceAddressLineDos"
                                    id="practiceAddressLineDos"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.addressLineDos')}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                {t('createPracticeClinical.designation')}
                                <Field
                                    name="designation"
                                    id="designation"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.designation')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('createPracticeClinical.specialty')}
                                <Field
                                    name="speciality"
                                    id="speciality"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.specialty')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('createPracticeClinical.testingTypes')}
                                <Field
                                    name="testingTypes"
                                    id="testingTypes"
                                    component={TextField}
                                    fullWidth
                                    required
                                    select
                                    placeholder={t('createPracticeClinical.testingTypes')}
                                >
                                    {testingTypes.map((option) => (
                                        <MenuItem key={option.label} value={option.label}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>

                        <DialogActions>
                            <Button type="submit" color="primary">
                                {t('actions.save')}
                            </Button>
                            <Button onClick={onClose}>
                                {t('medication.form.actions.close')}
                            </Button>
                        </DialogActions>
                    </FormikForm>}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default DoctorFormDialog;