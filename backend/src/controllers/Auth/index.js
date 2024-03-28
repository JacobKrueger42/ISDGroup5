// auth routing is configured to support these routes,
// signup: ['post', '/auth/signup'],
// login: ['post', '/auth/login'],
// logout: ['post', '/auth/logout'],
// resetPassword: ['post', '/auth/reset-password']

import { prisma, userAuthRepository } from '#services';

export async function signup(req, res) {
    const { email, name, password, role } = req.body;

    try {
        const user = await userAuthRepository.signupAsync(
            email,
            name,
            password,
            role
        );
        const session = await userAuthRepository.loginAsync(email, password);

        res.send('OK');
    } catch (error) {
        next(error);
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const session = await userAuthRepository.loginAsync(email, password);
        // TODO: create session
        res.send('OK');
    } catch (error) {
        next(error);
    }
}

export async function logout(req, res) {}

export async function resetPassword(req, res) {}
