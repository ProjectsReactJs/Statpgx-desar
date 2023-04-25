import { NextApiRequest, NextApiResponse } from "next";
import { Clinical } from "types/interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse<Clinical[]>) {
    res.status(200).json([
        {
            labPracticeId: 1,
            internalId: 1,
            practiceName: "Sesame Street Clinic",
            addressLineOne: "1",
            addressLineDos: "123ABC Circle",
            city: "Dallas",
            practiceState: "Texas",
            postalCode: "75204",
            phone: "9725555555",
            fax: "9725555555"
        }, {
            labPracticeId: 2,
            internalId: 2,
            practiceName: "Street Clinic",
            addressLineOne: "calle 123",
            addressLineDos: "Circle 246",
            city: "Dallas",
            practiceState: "Texas",
            postalCode: "75204",
            phone: "972569482",
            fax: "972525470"
        },
        {
            labPracticeId: 3,
            internalId: 3,
            practiceName: "Test Street Clinic",
            addressLineOne: "1",
            addressLineDos: "ABC Circle yup",
            city: "Ran Dallas",
            practiceState: "Texas d.",
            postalCode: "75204",
            phone: "9725555365",
            fax: "9725556955"
        }
    ]);
}