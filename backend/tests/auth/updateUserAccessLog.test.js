import { userAuthRepository } from '#services';
import { prisma } from '#services';

describe('updateUserAccessLogForLogout', () => {
    test('updates the logout date of the most recent user access log for the specified user id', async () => {
        // assuming user id 19 exists in the database
        const userId = 19;

        const { updateUserAccessLogForLogout } = userAuthRepository();
        await updateUserAccessLogForLogout(userId);

        const logoutDate = new Date();

        const mostRecentLog = await prisma.userAccessLog.findFirst({
            where: { userId: userId },
            orderBy: { loginDate: 'desc' }
        });

        // assert that the logout date of the most recent log is within 1 second
        expect(mostRecentLog.logoutDate.getTime()).toBeCloseTo(
            logoutDate.getTime(),
            -1000
        );
    });
});
