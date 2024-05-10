import { userAuthRepository } from '#services';
import { prisma } from '#services';

describe('createUserAccessLogForLogin', () => {
    test('creates a user access log with the login date for the specified user id', async () => {
        // assuming user id 19 exists in database
        const userId = 19;

        const { createUserAccessLogForLogin } = userAuthRepository();
        await createUserAccessLogForLogin(userId);

        // get the current date
        const loginDate = new Date();

        const newUserAccessLog = await prisma.userAccessLog.findFirst({
            where: { userId: userId },
            orderBy: { loginDate: 'desc' }
        });

        // assert it exists
        expect(newUserAccessLog).toBeDefined();
        
        // assert that the logout date of the new user acess log is within 1 second
        expect(newUserAccessLog.loginDate.getTime()).toBeCloseTo(
            loginDate.getTime(),
            -1000
        );
    });
});
