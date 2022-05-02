import { NextApiRequest, NextApiResponse } from "next"
import { getCongressists } from "../../services/firebase";

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "POST") {
        const { pass } = JSON.parse(request.body);
        
        if (pass === process.env.SIMPLEPASS) {
            return response.status(200).json(await getCongressists());
        }
        
        return response.status(401).json({ error: "unauthorized" });
    } else {
        return response.status(400).json({ error: "invalid method" });
    }
}