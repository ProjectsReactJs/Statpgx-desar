import { useTranslation } from 'next-i18next';
import { Formik, FormikHelpers } from "formik";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { MedicationsFormValues, defaultValues } from './medicationsHelper';
import useMedications from '@src/hooks/useMedications';
import MedicationsForm from '@src/components/medications/MedicationsForm';
import { useState } from 'react';

type PreviewDataDialogProps = {
    showPreview: boolean;
    onHidePreview: () => void;
    values: MedicationsFormValues
}

const PreviewDataDialog = (props: PreviewDataDialogProps) => {
    const { t } = useTranslation();

    const { showPreview, onHidePreview, values } = props;

    return (
        <Dialog
            open={showPreview}
            onClose={onHidePreview}
            aria-labelledby="medication-preview-title"
            aria-describedby="medication-dialog-description"
            fullWidth
            maxWidth={'md'}
        >
            <DialogTitle id="medication-preview-title">
                {t('medication.previewModal.title')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="medication-dialog-description">
                    <pre>{JSON.stringify(props.values, null, 2)}</pre>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onHidePreview}>
                    {t('medication.form.actions.close')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default function Medications() {
    const { t } = useTranslation();

    const { medications = [] } = useMedications();

    const [showPreview, setShowPreview] = useState(false);

    const onSubmit = async (values: MedicationsFormValues, actions: FormikHelpers<MedicationsFormValues>) => {
        //
    };

    const handleShowPreview = () => {
        setShowPreview(true);
    }

    const handleHidePreview = () => {
        setShowPreview(false);
    }

    return (
        <>
            <Formik
                initialValues={defaultValues}
                onSubmit={onSubmit}
                validate={(values: MedicationsFormValues) => {
                    return {
                        medications: values.medications.map(medication => ({
                            medicationId: medication.medicationId ? null : t('validation.messages.required'),
                            conditionTreatmentId: medication.conditionTreatmentId ? null : t('validation.messages.required'),
                            diagnosisId: medication.diagnosisId ? null : t('validation.messages.required'),
                        }))
                    };
                }}
                enableReinitialize
            >
                {(props) => (
                    <>
                        <MedicationsForm {...props} onShowPreview={handleShowPreview} medications={medications} />

                        <PreviewDataDialog
                            showPreview={showPreview}
                            onHidePreview={handleHidePreview}
                            values={props.values}
                        />
                    </>
                )}
            </Formik >
        </>
    );
}