import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MedicationsFormValues } from '../medicationsHelper';
import { Doctor } from 'types/interfaces';
import { Insurance } from 'types/interfaces';
import MedicationsDoctorSectionForm from './MedicationsDoctorSectionForm';

type MedicationsDoctorSectionProps = {
	data: MedicationsFormValues;
	onNext: (data: MedicationsFormValues) => void;
	doctors: Doctor[];
	insurance: Insurance[];
	onShowPreview: () => void;
};

const doctorSectionSchema = (t: (text: string) => string) =>
	Yup.object().shape({
		doctorInfo: Yup.object().shape({
			id: Yup.number().min(1, t('validation.messages.required')).required(t('validation.messages.required')),
			insuranceId: Yup.number().min(1, t('validation.messages.required')).required(t('validation.messages.required')),
		}),
	});

const MedicationsDoctorSection = (props: MedicationsDoctorSectionProps) => {
	const { data, onNext, doctors, insurance, onShowPreview } = props;
	const [token, setToken] = useState<string>('');
	const { t } = useTranslation();

	const onSubmit = async (values: MedicationsFormValues) => {
		//Validate token from cloudfire before continuing with the process to the next page
		console.log(token);
		onNext(values);
	};

	const onTokenChange = (token: string) => {
		console.log(process.env.TURNSTILE_SITE_KEY);
		setToken(token);
	};

	return (
		<Formik initialValues={data} onSubmit={onSubmit} validationSchema={doctorSectionSchema(t)} enableReinitialize>
			{(props) => (
				<MedicationsDoctorSectionForm
					{...props}
					onShowPreview={onShowPreview}
					doctors={doctors}
					insurance={insurance}
					onTokenChange={onTokenChange}
				/>
			)}
		</Formik>
	);
};
export default MedicationsDoctorSection;
