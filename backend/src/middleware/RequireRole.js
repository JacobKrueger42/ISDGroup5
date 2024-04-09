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
        return;
    }

    if (!roles || roles.length === 0) {
        console.error('a role must be supplied to this middleware');
        next(new Error('Authorisation invalid'));
        return;
    }

    await requireAuth(req, res, next, async () => {
        const { getUserAsync, availableRoles } = userAuthRepository();
        const user = await getUserAsync(req.session.userId);

        // check which provided roles intersect with available roles
        if (
            availableRoles.filter(availRole => roles.includes(availRole))
                .length === 0
        ) {
            console.error(
                `none of the provided roles are available. Provided: "${roles}", available "${availableRoles}"`
            );
            next(new Error('Authorisation invalid'));
        } else if (!roles.includes(user.role)) {
            const forbiddenMessage = `Invalid role, cannot access "${req.path}"`;
            console.log(forbiddenMessage);
            next(new Error(forbiddenMessage));
        } else {
            console.log('callback triggered');
            await callback();
            next();
        }
    });
}
