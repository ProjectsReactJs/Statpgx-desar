import { NextApiRequest, NextApiResponse } from "next";
import { Doctors } from "types/interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse<Doctors[]>) {
    res.status(200).json([
        {
            id: 1,
            name: "Alfredo Martinez shri",
            specialty: "neurologist",

        },
        {
            id: 2,
            name: "Alejandra Maria Jimenez Balnco",
            specialty: "cardiologist",

        },
        {
            id: 3,
            name: "Manuel Alejandro Paez Otris",
            specialty: "Surgeon",

        }
    ]);
}