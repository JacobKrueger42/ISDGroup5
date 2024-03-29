// auth routing is configured to support these routes,
// signup: ['post', '/auth/signup'],
// login: ['post', '/auth/login'],
// logout: ['post', '/auth/logout'],
// resetPassword: ['post', '/auth/reset-password']

import { prisma, userAuthRepository } from '#services';

export async function signup(req, res) {
    try {
        const { email, name, password, role } = req.body;
        await userAuthRepository.signupAsync(email, name, password, role);

        // by logging in with the provided creds after signup we implicitly
        // assert that signup was successful - this is a lazy approach
        // typically we should redirect back to /login and prompt the user to test their memory+credentials
        // by manually signing in
        const user = await userAuthRepository.loginAsync(email, password);

        req.session.regenerate(err => {
            if (err) next(err);

            // populate session
            req.session.userId = user.Id;

            req.session.save(err => {
                if (err) next(err);

                res.json({
                    redirect_uri: '/welcome'
                });
            });
        });
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await userAuthRepository.loginAsync(email, password);

        req.session.regenerate(err => {
            if (err) next(err);

            // populate session
            req.session.userId = user.Id;

            req.session.save(err => {
                if (err) next(err);

                res.json({
                    redirect_uri: '/welcome'
                });
            });
        });
    } catch (error) {
        next(error);
    }
}

export async function logout(req, res, next) {
    try {
        delete req.session.userId;
        req.session.save(err => {
            if (err) next(err);

            req.session.regenerate(err => {
                if (err) next(err);
                res.json({
                    redirect_uri: '/'
                });
            });
        });
    } catch (error) {
        next(error);
    }
}

export async function resetPassword(req, res, next) {
    next(Error('not implemented yet!'));
}
