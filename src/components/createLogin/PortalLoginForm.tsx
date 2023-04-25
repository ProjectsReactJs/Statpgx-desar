import { useState } from 'react';
import { Field, Form as FormikForm, FormikProps } from 'formik';
import { Button, Grid, MenuItem } from '@mui/material';
import QueueIcon from '@mui/icons-material/Queue';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import FormHeader from '@src/ui/forms/FormHeader';
import FormTitle from '@src/ui/forms/FormTitle';
import { useTranslation } from 'next-i18next';
import FormConainter from '@src/ui/forms/FormConainter';
import FormInnerContainer from '@src/ui/forms/FormInnerContainer';
import { TextField } from '@src/ui/forms/controls/TextField';
import { User, Doctor, Clinical } from 'types/interfaces';
import { UserDataFormValues } from './portalLoginDataHelper';
import PortalLoginFormDialog from './PortalLoginFormDialog';


type PortalLoginFormProps = FormikProps<UserDataFormValues> & {
    users: User[];
    doctors: Doctor[];
    clinicals: Clinical[];
    onShowPreview: () => void;
    onAddLoginUser: (user: User) => void
};
const PortalLoginForm = (props: PortalLoginFormProps) => {
    const { t } = useTranslation();
    const { users, values, onAddLoginUser, doctors, clinicals, onShowPreview } = props;
    const [showLoginUserDialog, setShowLoginUserDialog] = useState(false);

    return (
        <>
            <FormikForm noValidate autoComplete="false"
            >
                <FormHeader>
                    <FormTitle variant="h6" color="inherit" noWrap>
                        {t('Login.title')}
                    </FormTitle>
                </FormHeader>
                <FormConainter>
                    <FormInnerContainer >
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                {t('Login.title')}
                                <Field
                                    id="userId"
                                    name="userId"
                                    label={t('Login.userLogin')}
                                    component={TextField}
                                    fullWidth
                                    required
                                    select
                                    placeholder={t('Login.userLogin')}
                                >
                                    {users.map((option) => (
                                        <MenuItem key={option.userId} value={option.userId}>
                                            {`${option.userFirstName} ${option.userLastName}`}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>
                        <Button
                            startIcon={<QueueIcon />}
                            variant="contained"
                            color='success'
                            onClick={() => setShowLoginUserDialog(show => !show)}
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                        >
                            {t('Login.AddUser')}
                        </Button>

                        <Button
                            startIcon={<SaveIcon />}
                            variant="contained"
                            color='primary'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                        >
                            {t('createPracticeClinical.save')}
                        </Button>
                    </FormInnerContainer>

                    <FormInnerContainer >
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                {t('Login.AssignFileManagementV')}
                                <Field
                                    id="labPracticeId"
                                    name="labPracticeId"
                                    label={t('Login.PleaseSelectaPractice')}
                                    component={TextField}
                                    placeholder={t('Login.PleaseSelectaPractice')}
                                    fullWidth
                                    required
                                    select
                                    disabled={!values.userId}
                                >
                                    {clinicals.map((option) => (
                                        <MenuItem key={option.labPracticeId} value={option.labPracticeId}>
                                            {`${option.practiceName}`}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid item sm={12}>
                                <Field
                                    id="doctorId"
                                    name="doctorId"
                                    label={t('Login.PleaseSelectaDoctor')}
                                    placeholder={t('Login.PleaseSelectaDoctor')}
                                    component={TextField}
                                    required
                                    fullWidth
                                    select
                                    disabled={!values.labPracticeId}
                                >
                                    {doctors.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {`${option.doctorFirstName} ${option.doctorLastName} - ${option.speciality}`}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>
                        <Button
                            startIcon={<SaveIcon />}
                            variant="contained"
                            color='primary'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                        >
                            {t('createPracticeClinical.save')}
                        </Button>
                        <Button
                            startIcon={<PreviewIcon />}
                            variant="outlined"
                            color="secondary"
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                            onClick={onShowPreview}
                        >
                            {t('medication.form.actions.showPreview')}
                        </Button>
                    </FormInnerContainer>
                </FormConainter>
            </FormikForm >

            <PortalLoginFormDialog
                show={showLoginUserDialog}
                onClose={() => setShowLoginUserDialog(false)}
                onSubmit={values => {
                    onAddLoginUser({
                        userId: Math.floor(Math.random() * 10000),
                        userLogin: values.userLogin,
                        userFirstName: values.userFirstName,
                        userLastName: values.userLastName,
                        phone: values.phone,
                        emailAddress: values.emailAddress
                    })
                    setShowLoginUserDialog(false)
                }}
            />

        </>
    )
}

export default PortalLoginForm