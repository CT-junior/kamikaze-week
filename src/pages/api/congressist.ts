import { NextApiRequest, NextApiResponse } from "next"
import { addCongressist } from "../../services/firebase";

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "POST") {
        const {congressist} = JSON.parse(request.body);

        addCongressist(congressist);
        
        return response.status(201);
    } else {
        return response.status(400).json({ error: "invalid method" });
    }
}