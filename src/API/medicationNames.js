export const getMedicationNames = () => {
    return new Promise((resolve) => {
        resolve([
            {
                "value": "2",
                "label": "Abilify"

            },
            {
                "value": "3",
                "label": "Acabel"
            }
        ])
    })
}