import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import useMedications from '@src/hooks/useMedications';
import useDoctors from '@src/hooks/useDoctors';
import MedicationsOutputSection from './output-section/MedicationsOutputSection';
import MedicationsMainSection from './main-section/MedicationsMainSection';
import { MedicationsFormValues, defaultValues } from './medicationsHelper';
import MedicationsPatientInfoSection from './patient-info-section/MedicationsPatientInfoSection';
import MedicationsPreviewDataDialog from './main-section/MedicationsPreviewDataDialog';
import MedicationsDoctorSection from './welcome-section/MedicationsDoctorSection';
import useInsurances from '@src/hooks/useInsurances';

export default function Medications() {
    const { t } = useTranslation();

    const { medications = [] } = useMedications();

    const { doctors = [] } = useDoctors();

    const { insurance = [] } = useInsurances();

    const [data, setData] = useState<MedicationsFormValues>(defaultValues);

    const [currentStep, setCurrentStep] = useState(0);

    const [showPreview, setShowPreview] = useState(false);

    const handlePrev = (newData: MedicationsFormValues) => {
        setData(prevData => ({
            ...prevData,
            ...newData
        }));

        setCurrentStep(step => step - 1);
    }

    const handleNext = (newData: MedicationsFormValues) => {
        setData(prevData => ({
            ...prevData,
            ...newData
        }));

        setCurrentStep(step => step + 1);
    }

    const handleEnd = (newData: MedicationsFormValues) => {
        setData(prevData => ({
            ...prevData,
            ...newData
        }));
    }

    const handleShowPreview = () => {
        setShowPreview(true);
    }

    const handleHidePreview = () => {
        setShowPreview(false);
    }

    const steps = [

        <MedicationsDoctorSection
            data={data}
            doctors={doctors}
            insurance={insurance}
            onShowPreview={handleShowPreview}
            onNext={handleNext}
        />,
        <MedicationsMainSection
            onShowPreview={handleShowPreview}
            onNext={handleNext}
            onPrev={handlePrev}
            data={data}
            medications={medications}
        />,
        <MedicationsOutputSection
            onPrev={handlePrev}
            onNext={handleNext}
            data={data}
        />,
        <MedicationsPatientInfoSection
            onShowPreview={handleShowPreview}
            onPrev={handlePrev}
            onEnd={handleEnd}
            data={data}
        />
    ];

    return <>
        {steps[currentStep]}

        <MedicationsPreviewDataDialog
            showPreview={showPreview}
            onHidePreview={handleHidePreview}
            values={data}
        />
    </>
}
