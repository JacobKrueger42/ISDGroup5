import HttpStatus from 'http-status-codes';

export default async function requireAuth(req, res, next, callback) {
    if (typeof callback !== 'function') {
        console.error('a valid callback must be supplied to this middelware');
        next(new Error('Authorisation invalid'));
    }

    if (!req?.session?.userId) {
        const forbiddenMessage = `Authorization is required to access "${req.path}"`;
        console.log(forbiddenMessage);

        res.header('Content-Type', 'application/json')
            .status(HttpStatus.FORBIDDEN)
            .json({
                path: req.path,
                detailed_error_message: forbiddenMessage,
                message: 'Forbidden'
            });
    } else {
        // typically we would assert the user ID isn't bogus
        // but I'm not adding caching to this project or extra db lookups
        await callback();
    }
}
