// ensure we have a single instance of the transponder globally to
// avoid resource contention issues

import nodemailer from 'nodemailer';
import { EmailConfig, ServerOptions } from '#configuration';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    host: EmailConfig.host,
    port: EmailConfig.port,
    // disable TLS - I ain't doing that for this project
    secure: false,
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        password: process.env.EMAIL_AUTH_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const verify = () => {
    try {
        transporter.verify((error, success) => {
            if (error) {
                ServerOptions.verbose &&
                    console.debug(
                        'Transponder Client | Failed to validate the email notifier with error: ',
                        error
                    );
                throw new Error(error);
            }

            console.log(
                'Transponder Client | Email server is ready to take our messages'
            );
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default { client: transporter, verify };
