import { MedicationsFormValues } from "@components/medications/medicationsHelper";
import { Doctor } from "types/interfaces";

export type ClinicalPracticeFormValues = {
    practiceName: string;
    addressLineOne: string;
    addressLineTwo: string;
    practiceState: string;
    postalCode: string;
    phone: string;
    fax: string;
    internalID: string;
};

export const clinicalPracticeDefaultValues: ClinicalPracticeFormValues = {
    internalID: '',
    practiceName: '',
    addressLineOne: '',
    addressLineTwo: '',
    practiceState: '',
    postalCode: '',
    phone: '',
    fax: ''
}

export type ClinicalAccountsFormValues = {
    labPracticeId: number;
    currentDoctorId: number;
    doctors: Doctor[];
}

export const defaultClinicalAccountsValues: ClinicalAccountsFormValues = {
    labPracticeId: 0,
    currentDoctorId: 0,
    doctors: [],
}

export type DoctorFormValues = {
    doctorFirstName: string,
    doctorLastName: string,
    npiNumber: number
    practiceAddressLineOne: string,
    practiceAddressLineDos: string,
    speciality: string,
    designation: string,
    testingTypes: string
}

export const doctorDefaultValues: DoctorFormValues = {
    doctorFirstName: '',
    doctorLastName: '',
    npiNumber: 0,
    practiceAddressLineOne: '',
    practiceAddressLineDos: '',
    speciality: '',
    designation: '',
    testingTypes: ''
}