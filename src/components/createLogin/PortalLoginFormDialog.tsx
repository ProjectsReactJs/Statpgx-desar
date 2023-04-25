import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { Field, Form as FormikForm, Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import { TextField } from "@src/ui/forms/controls/TextField";
import { UserFormValues, userDefaultValues } from "./portalLoginDataHelper";

const portalUserSchema = (t: (text: string) => string) => Yup.object().shape({
    userLogin: Yup.string().matches(/^[a-zA-Z ]*$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(5, (t("validation.messages.messages.required"))),
    userFirstName: Yup.string().required(t("validation.messages.required")).min(10, (t("validation.messages.required"))),
    userLastName: Yup.string().required(t("validation.messages.required")).min(10, (t("validation.messages.required"))),
    EmailAddress: Yup.string().email((t("validation.messages.format"))).required(t("validation.messages.required")),
    Phone: Yup.string().matches(/^[+0-9]+$/, (t("validation.messages.required"))).required(t("validation.messages.required")).min(10, (t("validation.messages.required"))),
})

type PortalUserFormDialogProps = {
    show: boolean;
    onClose: () => void;
    onSubmit: (values: UserFormValues, formikHelpers: FormikHelpers<UserFormValues>) => void | Promise<void>
}

const PortalLoginFormDialog = (props: PortalUserFormDialogProps) => {
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
                    validationSchema={portalUserSchema(t)}
                    initialValues={userDefaultValues}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {() => <FormikForm noValidate autoComplete="false">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {t('Login.userLogin')}
                                <Field
                                    id="userLogin"
                                    name="userLogin"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('Login.userLogin')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('Login.userFirstName')}
                                <Field
                                    id="userFirstName"
                                    name="userFirstName"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('Login.userFirstName')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('Login.userLastName')}
                                <Field
                                    id="userLastName"
                                    name="userLastName"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('Login.userLastName')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('Login.Phone')}
                                <Field
                                    id="Phone"
                                    name="Phone"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('Login.Phone')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('Login.EmailAddress')}
                                <Field
                                    id="EmailAddress"
                                    name="EmailAddress"
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('Login.EmailAddress')}
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

export default PortalLoginFormDialog;