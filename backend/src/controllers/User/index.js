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
            const user = await userAuthRepository.getUserAsync(userId);
            res.json(user);
        }
    } catch (error) {
        next(error);
    }
}
