import { NextApiRequest, NextApiResponse } from "next"
import { addFirebaseCongressist } from "../../services/firebase";

import { SMTPClient } from "emailjs";



export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "POST") {
        const { congressist } = JSON.parse(request.body);

        const emailText = `<html>
        <head>
            <title></title>
            <link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />
        </head>
        <body>
        <div>
        <div>Sua inscri&ccedil;&atilde;o para a <strong>SEMANA DA CT </strong>foi confirmada! 🥳<br />
        <br />
        Segue a programa&ccedil;&atilde;o da semana:<br />
        <br />
        Dia 03/05, 15h: O que o RH te ensina sobre a engenharia - 📍Local: Audit&oacute;rio do CT1<br />
        Dia 04/05, 16h: T&eacute;cnicas que se aprendem no profissional que podem ser usadas no meio acad&ecirc;mico e pessoal - 📍 Local: Audit&oacute;rio do CT1<br />
        Dia 05/05, 19h: UX Design: do zero &agrave; sua primeira cria&ccedil;&atilde;o -&nbsp; ONLINE (https://meet.google.com/jun-nvmt-xhc)<br />
        Dia 06/05, 15h: Processos construtivos na pr&aacute;tica -&nbsp; 📍Local: Audit&oacute;rio do CT1<br />
        <br />
        Seu crach&aacute; virtual: https://semana.ctjunior.com.br/congressistas/${congressist.clientId}<br />
        Ele estar&aacute; dispon&iacute;vel em alguns instantes!<br />
        <br />
        Basta mostrar esse crach&aacute; virtual ou informar seu e-mail na portaria!</div>

        <div style="display: none;">${JSON.stringify(congressist)}</div>
        </div>
        </body>
        </html>


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
                    attachments: [
                        { data: emailText, alternative: true },
                    ]
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
