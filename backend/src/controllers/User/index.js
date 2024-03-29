import { prisma } from '#services';

// TODO: session auth requirement
export async function get(req, res, next) {
    try {
        const userId = req.sesion.userId;
        const user = await userAuthRepository.getUserAsync(userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
}
