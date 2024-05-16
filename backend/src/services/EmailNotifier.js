import sgMail from '@sendgrid/mail';
import { EmailConfig, ServerOptions } from '#configuration';
import { isNullOrEmpty } from './StringUtils.js';

export default function emailNotifier() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    async function sendAsync({ to, subject, message }) {
        if (typeof to !== 'string' || isNullOrEmpty(to))
            throw new Error('cannot send mail without a "to" address');

        if (typeof subject !== 'string' || isNullOrEmpty(subject))
            throw new Error('cannot send mail without a "subject"');

        if (typeof message !== 'string' || isNullOrEmpty(message))
            throw new Error('cannot send mail without a "message"');

        try {
            ServerOptions.verbose &&
                console.debug(
                    `Email Notifier | Sending mail to '${to}' regarding '${subject}'`
                );

            const response = await sgMail.send({
                to: to,
                from: EmailConfig.fromAddress,
                subject: subject,
                html: message
            });

            ServerOptions.verbose &&
                console.debug(
                    `Email Notifier | Sent mail '${to}' regarding '${subject}' with response: `,
                    response
                );
        } catch (error) {
            console.error(
                `Email Notifier | Failed to send email to '${to}' regarding '${subject}'`
            );

            ServerOptions.verbose &&
                console.error(
                    `Email Notifier | Error included a response body, `,
                    error
                );
        }
    }

    return {
        sendAsync
    };
}
