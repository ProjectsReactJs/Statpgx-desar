import { NextApiRequest, NextApiResponse } from "next";
import { ConditionTreatment } from "types/interfaces";

const data: ConditionTreatment[] = [
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

export default function handler(req: NextApiRequest, res: NextApiResponse<ConditionTreatment[]>) {
    const { medicationId } = req.query;

    let filteredData: ConditionTreatment[] = data;

    if (medicationId) {
        filteredData = filteredData.filter(conditionTreatment => conditionTreatment.medicationId === Number(medicationId))
    }

    res.status(200).json(filteredData);
}