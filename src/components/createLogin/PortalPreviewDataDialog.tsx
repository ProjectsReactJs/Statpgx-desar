import { useTranslation } from "next-i18next";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { UserDataFormValues } from "./portalLoginDataHelper";

type PortalPreviewDataDialogProps = {
    showPreview: boolean;
    onHidePreview: () => void;
    values: UserDataFormValues;
}

const PortalPreviewDataDialog = (props: PortalPreviewDataDialogProps) => {
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
                <pre>{JSON.stringify(values, null, 2)}</pre>
            </DialogContent>
            <DialogActions>
                <Button onClick={onHidePreview}>
                    {t('medication.form.actions.close')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PortalPreviewDataDialog;