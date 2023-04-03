import { useRef } from "react";
import { useTranslation } from "next-i18next";
import SignatureCanvas from 'react-signature-canvas'
import { Box, Button } from '@mui/material';

type MedicationSignProps = {
    onChange: (base64Image: string) => void
}

export default function MedicationsSign(props: MedicationSignProps) {
    const { onChange } = props;

    const { t } = useTranslation();

    const signRef = useRef<SignatureCanvas | null>(null);

    const handleClear = () => {
        signRef.current?.clear();
        onChange?.('');
    }
    const handleGenerate = () => {
        onChange?.(signRef.current?.getTrimmedCanvas().toDataURL('imagen/png') ?? '')
    }

    return (
        <>
            <Box style={{ textAlign: 'center' }}>
                <SignatureCanvas
                    canvasProps={{ width: 500, height: 200, style: { border: '1px solid black' } }}
                    ref={signRef}
                    penColor='black'
                    velocityFilterWeight={1}
                    dotSize={1}
                    onEnd={handleGenerate}
                />
            </Box>
            <Box style={{ textAlign: 'center' }}>
                <Button
                    color='error'
                    variant="contained"
                    onClick={handleClear}
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                >
                    {t('medication.firme.clear')}
                </Button>
            </Box>
        </>
    )
}

