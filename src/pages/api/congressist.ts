import { NextApiRequest, NextApiResponse } from "next"
import { addFirebaseCongressist } from "../../services/firebase";

import { SMTPClient } from "emailjs";



export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "POST") {
        const { congressist } = JSON.parse(request.body);

        const emailText = `Sua inscrição para a SEMANA DA CT foi confirmada! 🥳

Segue a programação da semana:

Dia 03/05, 15h: O que o RH te ensina sobre a engenharia - 📍Local: Auditório do CT1
Dia 04/05, 16h: Técnicas que se aprendem no profissional que podem ser usadas no meio acadêmico e pessoal - 📍 Local: Auditório do CT1
Dia 05/05, 19h: UX Design: do zero à sua primeira criação -  ONLINE (https://meet.google.com/jun-nvmt-xhc)
Dia 06/05, 15h: Processos construtivos na prática -  📍Local: Auditório do CT1

Seu crachá virtual: https://semana.ctjunior.com.br/congressistas/${congressist.clientId}
Ele estará disponível em alguns instantes!

Basta mostrar esse crachá virtual ou informar seu email na portaria!
`

        try {

            
            const client = new SMTPClient({
                user: process.env.EMAIL,
                password: process.env.PASSWORD,
                host: 'smtp-mail.outlook.com',
                tls: {
                    ciphers: 'SSLv3',
                },
            });

            await Promise.all([
                addFirebaseCongressist(congressist),
                
                client.sendAsync({
                    text: emailText,
                    from: process.env.EMAIL,
                    to: congressist.email,
                    subject: '[SEMANA DA CT] Inscrição confirmada!',
                })
                    .then((message) => { return response.json(message) })
                    .catch((err) => {
                        return response.json(err)
                    })
            ])
            
        } catch (error) {
            console.log(error);
        }

        return response.status(201);
    } else {
        return response.status(400).json({ error: "invalid method" });
    }
}
