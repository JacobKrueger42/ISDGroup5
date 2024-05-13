import { userAuthRepository } from '#services';
import { prisma } from '#services';

describe('getUserAsync', () => {
    test('returns user details for a specific user id', async () => {
        // sample user details, assuming user id exists in database
        const userId = 15;

        const { getUserAsync } = userAuthRepository();
        const user = await getUserAsync(userId);
        console.log(user.email);

        // assert user details
        expect(user).toBeDefined();
        expect(user.id).toBe(userId);

        const dbUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        // assert if returned user matches user in database
        expect(user).toEqual(dbUser);
    });
});
