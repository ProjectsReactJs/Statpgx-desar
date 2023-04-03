import { useTranslation } from "next-i18next";
import { Button, Grid, MenuItem } from '@mui/material';
import { Field, FieldArray, Form as FormikForm, FormikProps } from "formik";
import QueueIcon from '@mui/icons-material/Queue';
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useConditionTreatments from "@src/hooks/useConditionTreatments";
import { TextField } from "@src/ui/forms/controls/TextField";
import useRelevantDiagnosis from "@src/hooks/useRelevantDiagnosis";
import { ConditionTreatment, Medication, RelevantDiagnosis } from "types/interfaces";
import FormHeader from "@src/ui/forms/FormHeader";
import FormTitle from "@src/ui/forms/FormTitle";
import FormInnerContainer from "@src/ui/forms/FormInnerContainer";
import FormConainter from "@src/ui/forms/FormConainter";
import theme from "@src/theme";
import FormFooter from "@src/ui/forms/FormFooter";
import { ChangeEvent } from "react";
import { MedicationsFormValues } from "../medicationsHelper";

const MAX_NUMBER_OF_MEDICATIONS = 8;

type ConditionsTreatmentsSelectProps = {
    id: string;
    name: string;
    medicationId: number;
    onChange: (conditionTreatment?: ConditionTreatment) => void,
}

const ConditionsTreatmentsSelect = (props: ConditionsTreatmentsSelectProps) => {
    const { id, name, medicationId, onChange } = props;

    const { t } = useTranslation();

    const { conditionTreatments = [] } = useConditionTreatments({
        queryParams: {
            medicationId,
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(conditionTreatments.find(conditionTreatment => conditionTreatment.id === Number(e.target.value)));
    }


    return (
        <Field
            fullWidth
            select
            id={id}
            name={name}
            label={t('medication.form.fields.conditionTreatment')}
            component={TextField}
            required
            disabled={!medicationId}
            onChange={handleChange}
        >
            {conditionTreatments.map((option) => (
                <MenuItem key={option.id} value={option.id} >
                    {`${option.name} - ${option.description}`}
                </MenuItem>
            ))}
        </Field>
    )
}

type RelevantDiagnosisSelectProps = {
    id: string;
    name: string;
    medicationId: number;
    conditionTreatmentId: number;
    onChange: (relevantDiagnosis?: RelevantDiagnosis) => void,
}

const RelevantDiagnosisSelect = (props: RelevantDiagnosisSelectProps) => {
    const { id, name, medicationId, conditionTreatmentId, onChange } = props;

    const { t } = useTranslation();

    const { relevantDiagnosis = [] } = useRelevantDiagnosis({
        queryParams: {
            medicationId,
            conditionTreatmentId,
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(relevantDiagnosis.find(relevantDiagnosis => relevantDiagnosis.id === Number(e.target.value)));
    }

    return (
        <Field
            fullWidth
            select
            id={id}
            name={name}
            label={t('medication.form.fields.diagnosis')}
            component={TextField}
            required
            disabled={!medicationId || !conditionTreatmentId}
            onChange={handleChange}
        >
            {relevantDiagnosis.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {`${option.name} - ${option.description}`}
                </MenuItem>
            ))}
        </Field>
    )
}

type MedicationsMainSectionFormProps = FormikProps<MedicationsFormValues> & {
    medications: Medication[];
    onShowPreview: () => void;
    onPrev: (data: MedicationsFormValues) => void;
};

const MedicationsMainSectionForm = (props: MedicationsMainSectionFormProps) => {
    const { medications, values, onShowPreview, onPrev } = props;

    const { t } = useTranslation();

    return (
        <FormikForm noValidate autoComplete="false">
            <FormHeader>
                <FormTitle variant="h6" color="inherit" noWrap>
                    {t('medication.title')}
                </FormTitle>
            </FormHeader>

            <FieldArray name='medications'>
                {({ push, remove }) => (
                    <>
                        {values.medications.map((_, index) => <FormConainter key={index} style={{ marginBottom: theme.spacing(3) }}>
                            <FormInnerContainer>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        {t('medication.name')}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Field
                                            fullWidth
                                            select
                                            id={`medications-${index}-medicationId`}
                                            name={`medications.${index}.medicationId`}
                                            label={t('medication.form.fields.medicationName')}
                                            component={TextField}
                                            required
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setFieldValue(
                                                `medicationsFullInfo.${index}.medication`,
                                                medications.find(medication => medication.id === Number(e.target.value))
                                            )}
                                        >
                                            {medications.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {`${option.label}`}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {t('medication.condition')}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <ConditionsTreatmentsSelect
                                            id={`medications-${index}-conditionTreatmentId`}
                                            name={`medications.${index}.conditionTreatmentId`}
                                            medicationId={values.medications[index].medicationId}
                                            onChange={(cT) => props.setFieldValue(`medicationsFullInfo.${index}.conditionTreatment`, cT)}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        {t('medication.diagnosis')}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <RelevantDiagnosisSelect
                                            id={`medications-${index}-diagnosisId`}
                                            name={`medications.${index}.diagnosisId`}
                                            medicationId={values.medications[index].medicationId}
                                            conditionTreatmentId={values.medications[index].conditionTreatmentId}
                                            onChange={(rD) => props.setFieldValue(`medicationsFullInfo.${index}.diagnosis`, rD)}
                                        />
                                    </Grid>
                                </Grid>
                            </FormInnerContainer>

                            <FormFooter>
                                <Button
                                    startIcon={<DeleteForeverIcon />}
                                    variant="contained"
                                    color='error'
                                    sx={(theme) => ({ margin: theme.spacing(1) })}
                                    onClick={() => remove(index)}
                                >
                                    {t('medication.form.actions.remove')}
                                </Button>

                            </FormFooter>
                        </FormConainter>)}

                        {values.medications.length < MAX_NUMBER_OF_MEDICATIONS && <Button
                            startIcon={<QueueIcon />}
                            variant="contained"
                            color='success'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                            onClick={() => push({
                                medicationId: 0,
                                conditionTreatmentId: 0,
                                diagnosisId: 0,
                            })}
                        >
                            {t('medication.form.actions.add')}
                        </Button>
                        }
                        <Button
                            startIcon={<PreviewIcon />}
                            variant="outlined"
                            color='primary'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                            onClick={onShowPreview}
                        >
                            {t('medication.form.actions.showPreview')}
                        </Button>
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
                            startIcon={<EastIcon />}
                            variant="contained"
                            color='primary'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                        >
                            {t('medication.next')}
                        </Button>
                    </>
                )}
            </FieldArray>
        </FormikForm>
    );
}

export default MedicationsMainSectionForm;