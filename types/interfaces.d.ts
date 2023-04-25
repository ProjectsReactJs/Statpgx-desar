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
    label: string,
    value: string,
}

export interface Doctor {
    id: numberstring,
    insuranceId: numberstring,
    doctorFirstName: string,
    doctorLastName: string,
    speciality: string,
    npiNumber: number,
    designation: string,
    testingTypes: string,
    practiceAddressLineOne: string,
    practiceAddressLineDos: string,
    postalCode: numberstring,
}

export interface Insurance {
    id: number,
    name: string,
}
export interface FileManagementDate {
    id: number,
    patientId: number,
    date: string,
    status: string,
    patientName: string,
    doctorName: string,
    representative: string,
    repUserName: string,
    insurance: string,
    requisitionForm: string,
    supportingDocument: string,
    insuranceCard: string,
    checklist: string,
    testType: string,
    requisitionId: number,
    testHistoryId: number,
}

export interface Clinical {
    labPracticeId: number,
    internalId: number,
    practiceName: string,
    internalId: string,
    addressLineOne: string,
    addressLineDos: string,
    city: string,
    practiceState: string,
    postalCode: string,
    phone: string,
    fax: string
}

export interface User {
    userId: number,
    userLogin: string,
    userFirstName: string,
    userLastName: string,
    phone: string,
    emailAddress: string,
}

export interface TestingTypes {
    label: string;
}
