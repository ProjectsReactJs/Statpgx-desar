import { Fragment, useState } from 'react';
import { Field, FieldArray, Form as FormikForm, FormikProps } from 'formik';
import { Box, Button, Divider, Fab, Grid, IconButton, List, ListItem, MenuItem } from '@mui/material';
import QueueIcon from '@mui/icons-material/Queue';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormHeader from '@src/ui/forms/FormHeader';
import FormTitle from '@src/ui/forms/FormTitle';
import { useTranslation } from 'next-i18next';
import { ClinicalAccountsFormValues } from './clinicalAccountsHelper';
import FormConainter from '@src/ui/forms/FormConainter';
import FormInnerContainer from '@src/ui/forms/FormInnerContainer';
import { Clinical, Doctor } from 'types/interfaces';
import { TextField } from '@src/ui/forms/controls/TextField';
import ClinicalPracticeFormDialog from './ClinicalPracticeFormDialog';
import DoctorFormDialog from './DoctorFormDialog';

type ClinicalAccountsFromProps = FormikProps<ClinicalAccountsFormValues> & {
    clinicals: Clinical[];
    doctors: Doctor[];
    onShowPreview: () => void;
    onAddClinicalPractice: (clinical: Clinical) => void
    onAddDoctorPractice: (doctor: Doctor) => void
};

const ClinicalAccountsFrom = (props: ClinicalAccountsFromProps) => {
    const { t } = useTranslation();
    const { clinicals, doctors, values, onShowPreview, onAddClinicalPractice, onAddDoctorPractice } = props;

    const [showClinicalPracticeDialog, setShowClinicalPracticeDialog] = useState(false);
    const [showFormDoctor, setShowFormDoctor] = useState(false);

    return (
        <>
            <FormikForm noValidate autoComplete="false"
            >
                <FormHeader>
                    <FormTitle variant="h6" color="inherit" noWrap>
                        {t('createPracticeClinical.title')}
                    </FormTitle>
                </FormHeader>
                <FormConainter>
                    <FormInnerContainer >
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                {t('createPracticeClinical.pleaseSelectP')}
                                <Field
                                    id="labPracticeId"
                                    name="labPracticeId"
                                    label={t('createPracticeClinical.pleaseSelectP')}
                                    component={TextField}
                                    fullWidth
                                    required
                                    select
                                    placeholder={t('createPracticeClinical.pleaseSelectP')}
                                >
                                    {clinicals.map((option) => (
                                        <MenuItem key={option.labPracticeId} value={option.labPracticeId}>
                                            {`${option.practiceName}`}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>
                        <Button
                            startIcon={<QueueIcon />}
                            variant="contained"
                            color='success'
                            onClick={() => setShowClinicalPracticeDialog(show => !show)}
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                        >
                            {t('createPracticeClinical.addPractice')}
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
                    <FormInnerContainer>
                        <FieldArray name="doctors">
                            {({ push, remove }) => <>
                                {t('createPracticeClinical.pleaseSelectDoctor')}
                                <Box display={'flex'} alignItems={'center'}>
                                    <Field
                                        id="currentDoctorId"
                                        name="currentDoctorId"
                                        component={TextField}
                                        fullWidth
                                        required
                                        select
                                        label={t('createPracticeClinical.pleaseSelectDoctor')}
                                        placeholder={t('createPracticeClinical.pleaseSelectDoctor')}
                                        disabled={!values.labPracticeId}
                                    >
                                        {doctors.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {`${option.doctorFirstName} ${option.doctorLastName} ${option.doctorLastName}`}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    <Fab
                                        color="success"
                                        aria-label="add"
                                        style={{ marginLeft: 10 }}
                                        disabled={!values.labPracticeId}
                                        onClick={() => {
                                            const doctorFinder = (doctor: Doctor) => Number(doctor.id) === Number(values.currentDoctorId);

                                            const alreadySelected = values.doctors.some(doctorFinder)

                                            if (alreadySelected) {
                                                alert("The doctor has already been selected");
                                                return
                                            }

                                            const doctor = doctors.find(doctorFinder)

                                            if (doctor) {
                                                push(doctor)
                                            }
                                        }}
                                    >
                                        <AddIcon />
                                    </Fab>
                                </Box>

                                {values.doctors.length > 0 && <Box>
                                    {t('createPracticeClinical.doctores')}
                                    <List>
                                        {values.doctors.map((doctor, index) => (
                                            <Fragment key={doctor.id}>
                                                <ListItem
                                                    secondaryAction={<IconButton
                                                        edge="end"
                                                        aria-label="comments"
                                                        color="error"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>}
                                                >{doctor.doctorFirstName} {doctor.doctorLastName} - {doctor.speciality}</ListItem>
                                                {(index < values.doctors.length - 1) && <Divider />}
                                            </Fragment>
                                        ))}
                                    </List>
                                </Box>}
                            </>}
                        </FieldArray>

                        <Button
                            startIcon={<QueueIcon />}
                            variant="contained"
                            color='success'
                            onClick={() => setShowFormDoctor(show => !show)}
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                        >
                            {t('createPracticeClinical.addDoctor')}
                        </Button>

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
            </FormikForm>

            <ClinicalPracticeFormDialog
                show={showClinicalPracticeDialog}
                onClose={() => setShowClinicalPracticeDialog(false)}
                onSubmit={values => {
                    onAddClinicalPractice({
                        labPracticeId: Number(values.internalID),
                        internalId: Number(values.internalID),
                        practiceName: values.practiceName,
                        addressLineOne: values.addressLineOne,
                        addressLineDos: values.addressLineTwo,
                        city: '',
                        practiceState: values.practiceName,
                        postalCode: values.postalCode,
                        phone: values.phone,
                        fax: values.fax
                    })

                    setShowClinicalPracticeDialog(false)
                }}
            />

            <DoctorFormDialog
                show={showFormDoctor}
                onClose={() => setShowFormDoctor(false)}
                onSubmit={values => {
                    onAddDoctorPractice({
                        id: Math.floor(Math.random() * 10000),
                        insuranceId: Math.floor(Math.random() * 10000),
                        doctorFirstName: values.doctorFirstName,
                        doctorLastName: values.doctorLastName,
                        speciality: values.speciality,
                        npiNumber: values.npiNumber,
                        practiceAddressLineOne: values.practiceAddressLineOne,
                        practiceAddressLineDos: values.practiceAddressLineDos,
                        designation: values.designation,
                        testingTypes: values.testingTypes,
                        postalCode: Math.floor(Math.random() * 10000),
                    })
                    setShowFormDoctor(false)
                }}
            />
        </>
    )
}

export default ClinicalAccountsFrom