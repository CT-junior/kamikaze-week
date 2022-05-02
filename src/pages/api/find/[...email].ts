import { NextApiRequest, NextApiResponse } from "next"
import { getCongressistByEmail } from "../../../services/firebase";

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "GET") {
        const { email } = request.query;

        try {
            const result = await getCongressistByEmail(email[0]);

            return response.status(200).json({ result });
        } catch (error) {
            return response.status(404).json({ result: "not found" });
        }

    } else {
        return response.status(400).json({ error: "invalid method" });
    }
}