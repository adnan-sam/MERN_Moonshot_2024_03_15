import { NextApiRequest, NextApiResponse } from "next";
import { users } from "@/data/userData";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET') {
        const lastUser = users[users.length - 1];
        if (lastUser) {
            res.status(200).json(lastUser);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    }
    else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default handler