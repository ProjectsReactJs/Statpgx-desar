export type MedicationsFormValues = {
	medications: {
		medicationId: number;
		conditionTreatmentId: number;
		diagnosisId: number;
	}[]
};

export const defaultValues: MedicationsFormValues = {
	medications: [{
		medicationId: 0,
		conditionTreatmentId: 0,
		diagnosisId: 0,
	}]
};
