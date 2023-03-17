export interface Medication {
    id: number,
    label: string;
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