import { NextApiRequest, NextApiResponse } from "next"
import { addCongressist } from "../../services/firebase";

import { SMTPClient } from "emailjs";

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "POST") {
        const { congressist } = JSON.parse(request.body);

        try {
            const client = new SMTPClient({
                user: process.env.EMAIL,
                password: process.env.PASSWORD,
                host: 'smtp-mail.outlook.com',
                tls: {
                    ciphers: 'SSLv3',
                },
            });

            await client.sendAsync({
                text: `Just for testing purpose`,
                from: process.env.EMAIL,
                to: congressist.email,
                subject: 'testing emailjs',
            })
                .then((message) => { return response.json(message) })
                .catch((err) => {
                    return response.json(err)
                })

            addCongressist(congressist);
        } catch (error) {
            console.log(error);
        }

        return response.status(201);
    } else {
        return response.status(400).json({ error: "invalid method" });
    }
}