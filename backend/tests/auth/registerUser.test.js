import { userAuthRepository } from '#services';
import { prisma } from '#services'; 

describe('signupAsync', () => {
    test('creates a new user with the provided details', async () => {
        // sample user details
        const email = 'test12@example.com';
        const firstName = 'John';
        const lastName = 'Doe';
        const password = 'password123';
        const phone = '1234567890';
        const role = 'CUSTOMER';

        // call the function to sign up the user
        const { signupAsync } = userAuthRepository();
        await signupAsync(email, firstName, lastName, password, phone, role);

        const newUser = await prisma.user.findUnique({
            where: { email: email }
        });
        // check if created user matches the sample user details
        expect(newUser.email).toEqual(email);
        expect(newUser.firstName).toEqual(firstName);
        expect(newUser.lastName).toEqual(lastName);
        expect(newUser.phone).toEqual(phone);
        expect(newUser.role).toEqual(role);
    });
});
