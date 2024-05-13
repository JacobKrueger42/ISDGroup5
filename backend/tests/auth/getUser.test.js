import { userAuthRepository } from '#services';

describe('getUserAsync', () => {
    // use a dummy user for testing - this is brittle and relies on having run the seed method
    // to add sample data - since we have a auto inc. PK we can safely assume that ID 1 exists

    const mockUserId = 1;

    test('returns user details for a specific user id', async () => {
        const { getUserAsync } = userAuthRepository();
        const user = await getUserAsync(mockUserId);

        expect(user).toBeDefined();
        expect(user.email).toEqual('admin@notreal.com');
        expect(user.firstName).toEqual('Admin');
        expect(user.lastName).toEqual('Administrator');
        expect(user.password).toEqual('bbf2dead374654cbb32a917afd236656');
        expect(user.phone).toEqual('0000000000');
        expect(user.role).toEqual('ADMIN');
    });
});
