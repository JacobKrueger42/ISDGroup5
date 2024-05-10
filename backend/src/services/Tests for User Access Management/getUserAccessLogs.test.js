import { userAuthRepository } from '#services';
import { prisma } from '#services';

describe('getUserAccessLogs', () => {
    test('returns user access logs related to a specific user id', async () => {
        // sample user details, assuming user id exists in database
        const userId = 15;
        const { getUserAccessLogs } = userAuthRepository();
        const logs = await getUserAccessLogs(userId);

        // assert logs
        expect(logs).toBeDefined();
        expect(logs.length).toBeGreaterThan(0);
        expect(logs[0].userId).toBe(userId);

        const dbLogs = await prisma.userAccessLog.findMany({
            where: { userId: userId },
            orderBy: { loginDate: 'desc' }
        });

        // assert if returned logs equals logs in db
        expect(logs).toEqual(dbLogs);
    });
});
