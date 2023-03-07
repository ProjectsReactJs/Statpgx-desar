const data = [
    {
        id: 5,
        name: "Abilify",
        description: "Anxiety",
        medicationId: 2
    },
    {
        id: 8,
        name: "Abilify",
        description: "Bi-Polar Disorder",
        medicationId: 3
    }
];

export const getConditionTreatments = ({ medicationId } = {}) => {
    return new Promise((resolve) => {
        if (typeof medicationId !== 'undefined') {
            resolve(data.filter(item => item.medicationId == medicationId));
        }

        resolve(data);
    })
}