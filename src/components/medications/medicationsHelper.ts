import { ConditionTreatment, Medication, RelevantDiagnosis } from "types/interfaces";

export type MedicationsFormValues = {
	currentMedicationIndex: number,
	doctorInfo: {
		id: number;
		insuranceId: number;
		doctorName: string,
		speciality: string,
		practiceName: string,
		practiceAddressLine1: string,
		practiceAddressLine2: string,
		city: string,
		state: string,
		postalCode: string,
		doctorLastName: string,
		npiNumber: string,
		designation: Number,
		testingTypes: string
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
		id: 0,
		insuranceId: 0,
		doctorName: '',
		speciality: '',
		practiceName: '',
		practiceAddressLine1: '',
		practiceAddressLine2: '',
		city: '',
		state: '',
		postalCode: '',
		doctorLastName: '',
		npiNumber: '',
		designation: 0,
		testingTypes: ''
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