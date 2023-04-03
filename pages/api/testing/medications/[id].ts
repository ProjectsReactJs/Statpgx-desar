import { NextApiRequest, NextApiResponse } from "next";
import { Medication } from "types/interfaces";

const medications = [
    {
        id: 2,
        label: "Abilify",
        medicationSummary: [
            {
                summaryKey: "boxed_warning",
                title: "Boxed Warning",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae elementum. Enim ut sem viverra aliquet eget sit amet tellus cras."
            },
            {
                summaryKey: "contraindications",
                title: "Contraindications",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae elementum. Enim ut sem viverra aliquet eget sit amet tellus cras."
            }
        ]
    },
    {
        id: 3,
        label: "Acabel",
        medicationSummary: [
            {
                summaryKey: "drug_interactions",
                title: "Drug Interactions",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae elementum. Enim ut sem viverra aliquet eget sit amet tellus cras."
            }
        ]
    }
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Medication | undefined>) {
    const medication = medications.find(medication => medication.id === Number(req.query.id));

    /**
     * TODO: Return 404 when no medication is found and return a corresponding message
     */

    const status = medication ? 200 : 404;

    res.status(status).json(medication);
}