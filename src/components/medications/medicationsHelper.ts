import { ConditionTreatment, Medication, RelevantDiagnosis } from "types/interfaces";

export type MedicationsFormValues = {
	currentMedicationIndex: number,
	doctorInfo: {
		doctorId: number;
		insuranceId: number;
	},
	medications: {
		medicationId: number;
		conditionTreatmentId: number;
		diagnosisId: number;
	}[],
	medicationsFullInfo: {
		medication: Medication;
		conditionTreatment: ConditionTreatment;
		diagnosis: RelevantDiagnosis;
	}[],
	patientInfo: {
		firstName: string;
		lastName: string;
		address: string;
		telephone: string;
		email: string;
		dateBirth: string;
		sexAssig: string;
		sign: string;
		agreeToConsent: boolean;
	}
};

export const defaultValues: MedicationsFormValues = {
	currentMedicationIndex: 0,
	doctorInfo: {
		doctorId: 0,
		insuranceId: 0,
	},
	medications: [{
		medicationId: 0,
		conditionTreatmentId: 0,
		diagnosisId: 0,
	}],
	medicationsFullInfo: [],
	patientInfo: {
		firstName: '',
		lastName: '',
		address: '',
		telephone: '',
		email: '',
		dateBirth: '',
		sexAssig: '',
		sign: '',
		agreeToConsent: false,
	}
}