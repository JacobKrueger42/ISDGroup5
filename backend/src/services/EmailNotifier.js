import { transponder } from '#services';
import { EmailConfig, ServerOptions } from '#configuration';
import { isNullOrEmpty } from './StringUtils.js';

export default function emailNotifier() {
    init();

    function init() {
        ServerOptions.verbose &&
            console.debug('Email Notifier | Initialising email notifier');

        verify the configuration before continuing
        if (!transponder.verify()) {
            ServerOptions.verbose &&
                console.error(
                    'Email Notifier | Initialising email notifier failed'
                );
            return null;
        }
    }

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
            const info = await transponder.client.sendMail({
                from: EmailConfig.fromAddress,
                to: to,
                subject: subject,
                html: message
            });

            ServerOptions.verbose &&
                console.debug(
                    `Email Notifier | Sent mail '${to}' regarding '${subject}' with info: `,
                    info
                );
        } catch (error) {
            console.error(
                `Email Notifier | Failed to send email to '${to}' regarding '${subject}'`
            );
        }
    }

    return {
        sendAsync
    };
}
