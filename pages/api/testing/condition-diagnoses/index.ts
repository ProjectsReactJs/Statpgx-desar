import { NextApiRequest, NextApiResponse } from "next";
import { RelevantDiagnosis } from "types/interfaces";

const data: RelevantDiagnosis[] = [
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { medicationId } = req.query;
    const { conditionTreatmentId } = req.query;

    let filteredData: RelevantDiagnosis[] = data;

    if (medicationId) {
        filteredData = filteredData.filter(relevantDiagnosis => relevantDiagnosis.medicationId === Number(medicationId))
    }

    if (conditionTreatmentId) {
        filteredData = filteredData.filter(relevantDiagnosis => relevantDiagnosis.conditionTreatmentId === Number(conditionTreatmentId))
    }

    res.status(200).json(filteredData);
}