import { NextApiRequest, NextApiResponse } from "next"
import { addSpectator } from "../../services/firebase";

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "POST") {
        try {
            const { congressistId, workshopId } = JSON.parse(request.body);

            await addSpectator(congressistId, workshopId);

            return response.status(200).json({ message: "success" });
        } catch (error) {
            console.log(error);

            return response.status(401).json({ error: "unauthorized" });
        }
    } else {
        return response.status(400).json({ error: "invalid method" });
    }
}