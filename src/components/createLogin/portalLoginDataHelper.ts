
export type UserFormValues = {
    userId: number,
    userLogin: string,
    userFirstName: string,
    userLastName: string,
    phone: string,
    emailAddress: string,
}

export const userDefaultValues: UserFormValues = {
    userId: 0,
    userLogin: '',
    userFirstName: '',
    userLastName: '',
    phone: '',
    emailAddress: ''
}

export type UserDataFormValues = {
    labPracticeId: number;
    userId: number;
    doctorId: number;
}

export const defaultUserDataValues: UserDataFormValues = {
    labPracticeId: 0,
    userId: 0,
    doctorId: 0,
}