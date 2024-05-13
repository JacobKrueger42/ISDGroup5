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

        if (isNullOrEmpty(firstName))
            throw new Error('First name must be provided');

        if (isNullOrEmpty(lastName))
            throw new Error('Last name must be provided');

        if (isNullOrEmpty(email)) throw new Error('Email must be provided');

        if (isNullOrEmpty(password))
            throw new Error('Password must be provided');

        if (isNullOrEmpty(phone))
            throw new Error('Phone number must be provided');

        // check for existing user (email unique)
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
                role: role
            }
        });

        if (existingUser) throw new Error(`${email} already exists`);
        validateEmail(email);
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

        createUserAccessLogForLogin(user.id);

        return user;
    }

    async function createUserAccessLogForLogin(userId) {
        // log the login date
        const loginDate = new Date();
        await prisma.userAccessLog.create({
            data: {
                loginDate: loginDate,
                userId: userId
            }
        });
    }

    async function updateUserAccessLogForLogout(userId) {
        const logoutDate = new Date();

        // get the most recent user access log
        const mostRecentLog = await getMostRecentUserAccessLog(userId);

        if (mostRecentLog) {
            // update the logout date of the most recent log
            await prisma.userAccessLog.update({
                where: {
                    id: mostRecentLog.id
                },
                data: {
                    logoutDate: logoutDate
                }
            });
        } else {
            console.log('No recent access log found for the user.');
        }
    }

    async function getMostRecentUserAccessLog(userId) {
        // orders user access log by descending and returns the first one
        const mostRecentLog = await prisma.userAccessLog.findFirst({
            where: {
                userId: userId
            },
            orderBy: {
                loginDate: 'desc'
            }
        });

        return mostRecentLog;
    }

    async function getUserAccessLogs(userId) {
        // return all user access logs related to user id
        return prisma.userAccessLog.findMany({
            where: {
                userId: Number(userId)
            },
            orderBy: {
                loginDate: 'desc'
            }
        });
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
        if (isNullOrEmpty(firstName))
            throw new Error('First name must be provided');

        if (isNullOrEmpty(lastName))
            throw new Error('Last name must be provided');

        if (isNullOrEmpty(email)) throw new Error('Email must be provided');

        if (isNullOrEmpty(phone))
            throw new Error('Phone number must be provided');

        // check for existing user (email unique)
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser && existingUser.id != id) {
            throw new Error(`${email} already exists`);
        }

        // validate email
        validateEmail(email);

        // validate phone
        validatePhone(phone);

        // finally update user
        await editUserAsync(id, firstName, lastName, email, phone);

        console.log(`Updated user with id '${id}'`);
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

    async function removeUserAsync(id) {
        // delete user
        await deleteUserAsync(id);

        console.log(`Deleted user with id '${id}'`);
    }

    return {
        signupAsync,
        loginAsync,
        getUserAsync,
        updateUserAsync,
        removeUserAsync,
        updateUserAccessLogForLogout,
        createUserAccessLogForLogin,
        getUserAccessLogs,
        availableRoles
    };
}

// helpers

function validatePassword(password) {
    if (isNullOrEmpty(password))
        throw new Error('Password is required (none was provided)');

    if (password.length < passwordOptions.minLength)
        throw new Error(
            `Password must be at least ${passwordOptions.minLength} characters`
        );

    if (passwordOptions.requireAlphaNumeric) {
        const reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/);
        if (!reg.test(password))
            throw new Error(
                'Password must contain a combination of letters and numbers'
            );
    }
}

function validatePhone(phone) {
    if (isNullOrEmpty(phone))
        throw new Error('Phone number is required (none was provided)');

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
    // format e.g ran@gmail.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
