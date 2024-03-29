import HttpStatus from 'http-status-codes';
import { userAuthRepository } from '#services';

export async function get(req, res, next) {
    try {
        if (!req?.session?.userId) {
            res.status(HttpStatus.UNAUTHORIZED).json({
                path: req.path,
                detailed_error_message: 'You are not currently logged in',
                message: null
            });
        } else {
            const { getUserAsync } = userAuthRepository();
            const user = await getUserAsync(req.session.userId);
            res.json({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                displayName: `${user.firstName} ${user.lastName}`,
                id: user.id,
                role: user.role
            });
        }
    } catch (error) {
        next(error);
    }
}
