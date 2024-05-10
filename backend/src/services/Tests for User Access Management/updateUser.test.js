import { userAuthRepository } from '#services';
import { prisma } from '#services';

describe('updateUserAsync', () => {
    test('updates user details for a specific user id', async () => {
        // sample user details, assuming user id exists in database
        const userId = 14;
        const firstName = 'Jake';
        const lastName = 'Doe';
        const email = 'ran@gmail.com';
        const phone = '1234567890';

        // call the function to update user details
        const { updateUserAsync } = userAuthRepository();
        await updateUserAsync(userId, firstName, lastName, email, phone);

        const updatedUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        // assert that the user details have been updated as expected
        expect(updatedUser).toBeDefined();
        expect(updatedUser.firstName).toBe(firstName);
        expect(updatedUser.lastName).toBe(lastName);
        expect(updatedUser.email).toBe(email);
        expect(updatedUser.phone).toBe(phone);
    });
});
