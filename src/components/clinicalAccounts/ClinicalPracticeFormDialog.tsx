import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { Field, Form as FormikForm, Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import { TextField } from "@src/ui/forms/controls/TextField";
import { ClinicalPracticeFormValues, clinicalPracticeDefaultValues } from "./clinicalAccountsHelper";

const clinicalPracticeSchema = (t: (text: string) => string) => Yup.object().shape({
    practiceName: Yup.string().matches(/^[a-zA-Z ]*$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(5, (t("validation.messages.messages.required"))),
    addressLineOne: Yup.string().required(t("validation.messages.required")).min(10, (t("validation.messages.required"))),
    addressLineTwo: Yup.string().required(t("validation.messages.required")).min(10, (t("validation.messages.required"))),
    internalID: Yup.number().positive().required(t("validation.messages.required")),
    postalCode: Yup.string().matches(/^[a-zA-Z0-9 ]*$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(5, (t("validation.messages.messages.required"))),
    phone: Yup.string().matches(/^[+0-9]+$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(10, (t("validation.messages.required"))),
    fax: Yup.string().matches(/^[+0-9]+$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(10, (t("validation.messages.required"))),
})

type ClinicalPracticeFormDialogProps = {
    show: boolean;
    onClose: () => void;
    onSubmit: (values: ClinicalPracticeFormValues, formikHelpers: FormikHelpers<ClinicalPracticeFormValues>) => void | Promise<void>
}

const ClinicalPracticeFormDialog = (props: ClinicalPracticeFormDialogProps) => {
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
                {t('createPracticeClinical.addPractice')}
            </DialogTitle>
            <DialogContent>
                <Formik
                    validationSchema={clinicalPracticeSchema(t)}
                    initialValues={clinicalPracticeDefaultValues}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {() => <FormikForm noValidate autoComplete="false">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {t('createPracticeClinical.practiceName')}
                                <Field
                                    id="practiceName"
                                    name="practiceName"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.practiceName')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('createPracticeClinical.InternalID')}
                                <Field
                                    id="internalID"
                                    name="internalID"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.InternalID')}
                                />
                            </Grid>
                            <Grid item container >
                                {t('createPracticeClinical.addressLineOne')}
                                <Field
                                    id="addressLineOne"
                                    name="addressLineOne"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.addressLineOne')}
                                />
                            </Grid>
                            <Grid item container >
                                {t('createPracticeClinical.addressLineDos')}
                                <Field
                                    id="addressLineTwo"
                                    name="addressLineTwo"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.addressLineDos')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('createPracticeClinical.postalCode')}
                                <Field
                                    id="postalCode"
                                    name="postalCode"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.postalCode')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('createPracticeClinical.phone')}
                                <Field
                                    id="phone"
                                    name="phone"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.phone')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('createPracticeClinical.fax')}
                                <Field
                                    id="fax"
                                    name="fax"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('createPracticeClinical.fax')}
                                />
                            </Grid>
                        </Grid>

                        <div style={{ textAlign: 'right' }}>
                            <Button type="submit" color="primary">
                                {t('actions.save')}
                            </Button>
                            <Button onClick={onClose}>
                                {t('medication.form.actions.close')}
                            </Button>
                        </div>
                    </FormikForm>}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default ClinicalPracticeFormDialog;