import { userAuthRepository } from '#services';
import { prisma } from '#services';

describe('updateUserAsync', () => {
    test('deletes user with the specified id', async () => {
        // sample user details, assuming user id exists in database
        const userId = 17;

        const { removeUserAsync } = userAuthRepository();
        await removeUserAsync(userId);

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        // assert if user doesn't exist in database anymore
        expect(user).toBeNull();
    });
});
