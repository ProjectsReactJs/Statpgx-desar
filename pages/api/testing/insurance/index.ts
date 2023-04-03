import { NextApiRequest, NextApiResponse } from "next";
import { Insurance } from "types/interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse<Insurance[]>) {
    res.status(200).json([
        {
            id: 1,
            name: "mercantile policy",
        },
        {
            id: 2,
            name: "sux child insurance",
        },
        {
            id: 3,
            name: "commercial car medical insurance",
        }
    ]);
}
