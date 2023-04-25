import { NextApiRequest, NextApiResponse } from "next";
import { Doctor } from "types/interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse<Doctor[]>) {
    res.status(200).json([
        {
            id: 1,
            insuranceId: 1,
            doctorFirstName: "Alfredo Jesús",
            doctorLastName: "Martinez shri",
            speciality: "neurologist",
            npiNumber: 526,
            designation: "vd",
            testingTypes: "Hereditary Cancer Risk",
            practiceAddressLineOne: "1",
            practiceAddressLineDos: "123 ABC Circle",
            postalCode: 75204
        },
        {
            id: 2,
            insuranceId: 2,
            doctorFirstName: "Luis Manuel",
            doctorLastName: "Torres Ruiz",
            speciality: "neurologist",
            npiNumber: 689,
            designation: "DCE Tostl",
            testingTypes: "pharmacogenomics",
            practiceAddressLineOne: "123 ABC Circle",
            practiceAddressLineDos: "Calle 21-3",
            postalCode: 89246
        },
        {
            id: 3,
            insuranceId: 3,
            doctorFirstName: "Pedro José",
            doctorLastName: "Martinez Torrealba",
            speciality: "neurologist",
            npiNumber: 526,
            designation: "NOP Torres",
            testingTypes: "Cardiovascular NGS",
            practiceAddressLineOne: "Calle ZT",
            practiceAddressLineDos: "Tr",
            postalCode: 96982
        }
    ]);
}