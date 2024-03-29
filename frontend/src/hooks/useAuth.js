import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFetch } from '#hooks';

export default function useAuth() {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    const { get, post } = useFetch();

    async function loginAsync(email, password) {
        try {
            setLoading(true);
            const res = await post('auth/login', {
                email: email,
                password: password
            });

            await Promise.allSettled([getSessionAsync(), getUserAsync()]);

            setError(null);
            setLoading(false);

            navigate(res.redirect_uri);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    async function registerAsync(firstName, lastName, email, password) {
        try {
            setLoading(true);
            const res = await post('auth/signup', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                role: 'CUSTOMER'
            });

            setError(null);
            setLoading(false);

            navigate(res.redirect_uri);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    async function logoutAsync() {
        try {
            setLoading(true);
            const res = await post('auth/logout');

            setUser(null);
            setSession(null);
            setLoading(false);

            navigate(res.redirect_uri);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    async function resetPasswordAsync() {
        // TODO: stubbed
        throw new Error('not implemented yet!');
    }

    async function getSessionAsync() {
        setSession({});
        throw new Error('not implemented yet!');
    }

    async function getUserAsync() {
        const user = await get('user');
        setUser(user);
    }

    return {
        isLoading,
        error,
        user,
        session,
        loginAsync,
        logoutAsync,
        registerAsync,
        resetPasswordAsync
    };
}
