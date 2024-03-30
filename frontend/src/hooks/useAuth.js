import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFetch } from '#hooks';

export default function useAuth() {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { get, post } = useFetch();

    async function loginAsync(email, password) {
        console.info('logging in');
        try {
            setLoading(true);
            const res = await post('auth/login', {
                email: email,
                password: password
            });

            setError(null);
            setLoading(false);

            navigate(res.redirect_uri);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    async function registerAsync(firstName, lastName, email, password, phone) {
        console.info('registering new user');
        try {
            setLoading(true);
            const res = await post('auth/signup', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone,
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
        console.info('logging out');
        try {
            setLoading(true);
            const res = await post('auth/logout');
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

    async function getUserAsync() {
        try {
            setLoading(true);
            const user = await get('user');
            setLoading(false);
            return user;
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return {
        isLoading,
        error,
        getUserAsync,
        loginAsync,
        logoutAsync,
        registerAsync,
        resetPasswordAsync
    };
}
