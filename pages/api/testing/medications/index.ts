import { NextApiRequest, NextApiResponse } from "next";
import { Medication } from "types/interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse<Medication[]>) {
    res.status(200).json([
        {
            id: 2,
            label: "Abilify"
        },
        {
            id: 3,
            label: "Acabel"
        }
    ]);
}