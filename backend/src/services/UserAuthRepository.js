import { prisma } from '#services';
import PasswordHasher from '../services/PasswordHasher.js';
import { isNullOrEmpty } from './StringUtils.js';

const passwordOptions = Object.freeze({
    minLength: 8,
    requireAlphaNumeric: true
});

export default function userAuthRepository() {
    const availableRoles = ['ADMIN', 'STAFF', 'CUSTOMER'];

    ////////////////////////
    // lifecycle
    ////////////////////////

    function createAdminAsync(
        email,
        firstName,
        lastName,
        hashedPassword,
        phone
    ) {
        return prisma.user
            .create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
                    phone: phone,
                    role: 'ADMIN'
                }
            })
            .catch(error => {
                console.error('error creating admin:', error);
            });
    }

    function createStaffAsync(
        email,
        firstName,
        lastName,
        hashedPassword,
        phone
    ) {
        return prisma.user
            .create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
                    phone: phone,
                    role: 'STAFF'
                }
            })
            .catch(error => {
                console.error('error creating staff:', error);
            });
    }

    function createCustomerAsync(
        email,
        firstName,
        lastName,
        hashedPassword,
        phone
    ) {
        return prisma.user
            .create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
                    phone: phone,
                    role: 'CUSTOMER'
                }
            })
            .catch(error => {
                console.error('error creating customer:', error);
            });
    }

    ////////////////////////
    // workflow
    ////////////////////////

    async function signupAsync(
        email,
        firstName,
        lastName,
        password,
        phone,
        role
    ) {
        if (isNullOrEmpty(role) || !availableRoles.includes(role))
            throw new Error(
                'a role must be provided for a user (either ADMIN, CUSTOMER, or STAFF)'
            );

        if (isNullOrEmpty(email))
            throw new Error('an email must be provided to sign up');

        // check for existing user (email unique)
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
                role: role
            }
        });

        if (existingUser) throw new Error(`${email} already exists`);

        // simple password validation - simple assignment
        validatePassword(password);
        const { hashPassword } = PasswordHasher();

        // hash and persist the password, don't bother with salting
        const hashedPassword = hashPassword(password);

        validatePhone(phone);

        // finally persist user
        const result = await {
            ADMIN: createAdminAsync,
            CUSTOMER: createCustomerAsync,
            STAFF: createStaffAsync
        }[role](email, firstName, lastName, hashedPassword, phone);

        console.log(`created user with result: `, result);

        // TODO: generate signup "access" log
        // TODO: trigger email notification
        // TODO: generate notification "access" log
    }

    async function loginAsync(email, password) {
        if (isNullOrEmpty(email) || isNullOrEmpty(password))
            throw new Error('Email and password are required for login');

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) throw new Error(`user doesn't exist: ${email}`);

        const passwordHash = user.password;
        const { verifyHashedPassword } = PasswordHasher();

        if (!verifyHashedPassword(password, passwordHash))
            throw new Error('incorrect password');

        return user;
    }

    async function logoutAsync() {
        // TODO: stub
    }

    async function resetPasswordAsync() {
        // TODO: stub
    }

    async function getUserAsync(userId) {
        return prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    }

    function editUserAsync(userId, firstName, lastName, email, phone) {
        return prisma.user
            .update({
                where: {
                    id: Number(userId)
                },
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone
                }
            })
            .catch(error =>
                console.error(`Error updating user '${userId}':`, error)
            );
    }

    async function updateUserAsync(id, firstName, lastName, email, phone) {
        if (isNullOrEmpty(id)) throw new Error('Id not provided');
        console.log('Id given' + id);

        validatePhone(phone);

        validateEmail(email);

        await editUserAsync(id, firstName, lastName, email, phone);

        console.log(`Updated user with id '${id}'`);
    }

    async function removeUserAsync(id) {
        if (isNullOrEmpty(id))
            throw new Error('An id must be provided to delete a user');

        await deleteUserAsync(id);

        console.log(`Deleted user with id '${id}'`);
    }

    async function deleteUserAsync(id) {
        try {
            return await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            });
        } catch (error) {
            return console.error(`Error deleting user '${id}':`, error);
        }
    }

    return {
        signupAsync,
        loginAsync,
        logoutAsync,
        resetPasswordAsync,
        getUserAsync,
        updateUserAsync,
        removeUserAsync,
        availableRoles
    };
}

// helpers

function validatePassword(password) {
    if (isNullOrEmpty(password))
        throw new Error('a password is required (none was provided)');

    if (password.length < passwordOptions.minLength)
        throw new Error(
            `password must be at least ${passwordOptions.minLength} characters`
        );

    if (passwordOptions.requireAlphaNumeric) {
        const reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/);
        if (!reg.test(password))
            throw new Error(
                'password must contain a combination of letters and numbers'
            );
    }
}

function validatePhone(phone) {
    if (isNullOrEmpty(phone))
        throw new Error('A phone number is required (none was provided)');

    if (phone.length !== 10)
        throw new Error('Phone number must be exactly 10 digits');

    if (!/^\d+$/.test(phone))
        throw new Error('Phone number must contain only numbers');
}

function validateEmail(email) {
    if (isNullOrEmpty(email)) throw new Error('An email must be provided');

    if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
