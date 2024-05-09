import { requireRole } from '#middleware';
import { userAuthRepository } from '#services';

export async function getAll(req, res, next) {
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { getUserAccessLogs } = userAuthRepository();
                const logs = await getUserAccessLogs(req.params.id);
                return res.json({
                    results: logs
                });
            },
            ['CUSTOMER', 'STAFF', 'ADMIN']
        );
    } catch (error) {
        next(error);
    }
}
