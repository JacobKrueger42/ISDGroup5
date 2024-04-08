import HttpStatus from 'http-status-codes';
import { requireAuth } from '#middleware';
import { userAuthRepository } from '#services';

// this is a shortcut to using requireAuth, ie. they are mutually exclusive so use one or the other
// to avoid doubling up the auth check
// since roles is just a string, ensure it is ALL CAPS
export default async function requireRole(req, res, next, callback, roles) {
    if (typeof callback !== 'function') {
        console.error('a valid callback must be supplied to this middleware');
        next(new Error('Authorisation invalid'));
    }

    if (!roles || roles.length > 0) {
        console.error('a role must be supplied to this middleware');
        next(new Error('Authorisation invalid'));
    }

    await requireAuth(req, res, next, async () => {
        const { getUserAsync, availableRoles } = userAuthRepository();
        const user = await getUserAsync(req.session.userId);

        // check which provided roles intersect with available roles
        const inter = availableRoles.filter(availRole =>
            roles.includes(availRole)
        );

        if (inter.length > 0) {
            console.error(
                `none of the provided roles are available. Provided: "${roles}", available "${availableRoles}"`
            );
            next(new Error('Authorisation invalid'));
        }

        if (!roles.includes(user.role)) {
            const forbiddenMessage = `Invalid role, cannot access "${req.path}"`;
            console.log(forbiddenMessage);

            res.header('Content-Type', 'application/json')
                .status(HttpStatus.FORBIDDEN)
                .json({
                    path: req.path,
                    detailed_error_message: forbiddenMessage,
                    message: 'Forbidden'
                });
        }

        await callback();
    });
}
