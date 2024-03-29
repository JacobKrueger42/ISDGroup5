import HttpStatus from 'http-status-codes';

export default function requireAuth(err, req, res, next) {
    if (req.session.userId) {
        // typically we would assert the user ID isn't bogus
        // but I'm not adding caching to this project or extra db lookups
        next();
    } else {
        const forbiddenMessage = `Authorization is required to access "${req.path}"`;
        console.log(forbiddenMessage);

        res.header('Content-Type', 'application/json')
            .status(HttpStatus.FORBIDDEN)
            .json({
                path: req.path,
                detailed_error_message: forbiddenMessage,
                message: 'Forbidden'
            });
    }
}
