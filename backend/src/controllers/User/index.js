import { userAuthRepository } from '#services';
import { requireAuth } from '#middleware';

export async function get(req, res, next) {
    await requireAuth(req, res, next, async () => {
        try {
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
        } catch (error) {
            next(error);
        }
    });
}
