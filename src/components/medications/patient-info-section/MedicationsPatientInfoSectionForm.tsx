import { useTranslation } from 'next-i18next';
import { Field, Form as FormikForm, FormikProps } from "formik";
import { Grid, Button, MenuItem, TextField as MUITextField, FormHelperText, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FormTitle from '@src/ui/forms/FormTitle';
import FormHeader from '@src/ui/forms/FormHeader';
import FormConainter from '@src/ui/forms/FormConainter';
import FormInnerContainer from '@src/ui/forms/FormInnerContainer';
import MedicationsSign from './MedicationsSign';
import { TextField } from '@src/ui/forms/controls/TextField';
import { MedicationsFormValues } from '../medicationsHelper';
import { SexOption } from 'types/interfaces';
import { Checkbox } from '@src/ui/forms/controls/Checkbox';

type MedicationsPatientInfoSectionFormProps = FormikProps<MedicationsFormValues> & {
    sexOptions: SexOption[];
    onPrev: (data: MedicationsFormValues) => void;
};

export default function MedicationsPatientInfoSectionForm(props: MedicationsPatientInfoSectionFormProps) {
    const { values, setFieldValue, sexOptions, onPrev, errors, touched } = props;

    const { t } = useTranslation();

    return (
        <>
            <FormikForm noValidate autoComplete="false">
                <FormHeader>
                    <FormTitle variant="h6" color="inherit" noWrap>
                        {t('medication.patient.title')}
                    </FormTitle>
                </FormHeader>
                <FormConainter>
                    <FormInnerContainer>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {t('medication.patient.FirstName')}
                                <Field
                                    name="patientInfo.firstName"
                                    id="id"
                                    label={t('medication.patient.FirstName')}
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('medication.patient.FirstName')}
                                >
                                </Field>
                            </Grid>

                            <Grid item xs={6}>
                                {t('medication.patient.LastName')}
                                <Field
                                    name="patientInfo.lastName"
                                    fullWidth
                                    id="id"
                                    label={t('medication.patient.LastName')}
                                    component={TextField}
                                    required
                                    placeholder={t('medication.patient.LastName')}
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                {t('medication.patient.Address')}
                                <Field
                                    name="patientInfo.address"
                                    fullWidth
                                    id="id"
                                    label={t('medication.patient.Address')}
                                    component={TextField}
                                    required
                                    placeholder={t('medication.patient.Address')}
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                {t('medication.patient.Telephone')}
                                <Field
                                    name="patientInfo.telephone"
                                    fullWidth
                                    id="id"
                                    label={t('medication.patient.Telephone')}
                                    component={TextField}
                                    required
                                    placeholder={t('+000000000000')}
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                {t('medication.patient.Email')}
                                <Field
                                    name="patientInfo.email"
                                    fullWidth
                                    id="id"
                                    label={t('medication.patient.Email')}
                                    component={TextField}
                                    required
                                    placeholder={t('xxxxxxxx@xxxx.xxx')}
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                {t('medication.patient.DateBirth')}
                                <Field
                                    name="patientInfo.dateBirth"
                                    fullWidth
                                    id="id"
                                    label={t('medication.patient.DateBirth')}
                                    component={TextField}
                                    required
                                    placeholder={t('0000-00-00')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('medication.patient.SexAssig')}
                                <Field
                                    name="patientInfo.sexAssig"
                                    fullWidth
                                    select
                                    id="id"
                                    label={t('medication.patient.SexAssig')}
                                    component={TextField}
                                    required
                                    placeholder={t('medication.patient.SexAssig')}
                                >
                                    {sexOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>
                    </FormInnerContainer>
                    <FormConainter>
                        <Box paddingX={2} marginTop={4}>
                            {t('medication.patient.consentSection')}

                            <MUITextField
                                variant='outlined'
                                name='agreeToTerms'
                                fullWidth
                                id="id"
                                required
                                multiline
                                type={'checkbox'}
                                value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                            />

                            <Field
                                name="patientInfo.agreeToConsent"
                                label={t('medication.patient.Iagress')}
                                value={true}
                                component={Checkbox}
                            />

                            {(touched?.patientInfo?.agreeToConsent && errors?.patientInfo?.agreeToConsent) && <FormHelperText error>{errors.patientInfo.agreeToConsent}</FormHelperText>}
                        </Box>
                        <Box marginX={4} textAlign={'center'} color={'red'}>
                            {touched.patientInfo?.sign && errors.patientInfo?.sign && (
                                <div>{errors.patientInfo.sign}</div>
                            )}
                        </Box>
                        <MedicationsSign onChange={(sign) => setFieldValue('patientInfo.sign', sign)} />
                    </FormConainter>
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
                    type="submit"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color='primary'
                    sx={(theme) => ({ margin: theme.spacing(2) })}
                >
                    {t('medication.form.actions.save')}
                </Button>
            </FormikForm >
        </>
    )
}

