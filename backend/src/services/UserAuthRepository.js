import { prisma } from '#services';
import PasswordHasher from '../services/PasswordHasher.js';
import { isNullOrEmpty } from './StringUtils.js';

const passwordOptions = Object.freeze({
    minLength: 8,
    requireAlphaNumeric: true
});

const availableRoles = ['ADMIN', 'STAFF', 'CUSTOMER'];

export default function userAuthRepository() {
    ////////////////////////
    // lifecycle
    ////////////////////////

    function createAdminAsync(email, firstName, lastName, hashedPassword) {
        return prisma.user
            .create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
                    role: 'ADMIN'
                }
            })
            .catch(error => {
                console.error('error creating admin:', error);
            });
    }

    function createStaffAsync(email, firstName, lastName, hashedPassword) {
        return prisma.user
            .create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
                    role: 'STAFF'
                }
            })
            .catch(error => {
                console.error('error creating staff:', error);
            });
    }

    function createCustomerAsync(email, firstName, lastName, hashedPassword) {
        return prisma.user
            .create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
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

    async function signupAsync(email, firstName, lastName, password, role) {
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

        // finally persist user
        const result = await {
            ADMIN: createAdminAsync,
            CUSTOMER: createCustomerAsync,
            STAFF: createStaffAsync
        }[role](email, firstName, lastName, hashedPassword);

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

    return {
        signupAsync,
        loginAsync,
        logoutAsync,
        resetPasswordAsync,
        getUserAsync
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
