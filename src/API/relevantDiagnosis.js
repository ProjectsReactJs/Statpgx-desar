const data = [
    {
        id: 23,
        name: "Abilify",
        code: "F41.1",
        description: "Generalized anxiety disorder",
        medicationId: 2,
        conditionTreatmentId: 5
    },
    {
        id: 24,
        name: "Acabel",
        code: "F42.2",
        description: "disorder",
        medicationId: 3,
        conditionTreatmentId: 8
    }
];

export const getRelevantDiagnosis = ({ medicationId, conditionTreatmentId } = {}) => {
    return new Promise((resolve) => {
        if (typeof medicationId !== 'undefined' && conditionTreatmentId !== 'undefined') {
            resolve(data.filter((item => item.medicationId === medicationId && item.conditionTreatmentId === conditionTreatmentId)));
        }
        resolve(data);
    })
}