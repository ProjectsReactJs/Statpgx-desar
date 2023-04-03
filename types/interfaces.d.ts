export interface Medication {
    id: number,
    label: string;
    medicationSummary?: MedicationSummary[],
}
export interface ConditionTreatment {
    id: number,
    name: string,
    description: string,
    medicationId: number;
}
export interface RelevantDiagnosis {
    id: number,
    name: string,
    code: string,
    description: string,
    medicationId: number,
    conditionTreatmentId: number
}
export interface MedicationSummary {
    summaryKey: string,
    title: string,
    description: string,
}

export interface SexOption {
    label: string;
    value: string;
}

export interface Doctors {
    id: number,
    name: string,
    specialty: string,
}

export interface Insurance {
    id: number,
    name: string,
}