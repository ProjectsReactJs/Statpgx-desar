import { NextApiRequest, NextApiResponse } from "next";
import { User } from "types/interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse<User[]>) {
    res.status(200).json([
        {
            userId: 1,
            userLogin: "FJardim",
            userFirstName: "Felicia ",
            userLastName: "Jardim",
            phone: "+584149498382",
            emailAddress: "licdafeliciajardim0305@gmail.com"
        },
        {
            userId: 2,
            userLogin: "APerez",
            userFirstName: "Alejandro ",
            userLastName: "Perez",
            phone: "+584249497403",
            emailAddress: "aleperez541@gmail.com"
        }
    ]);
}