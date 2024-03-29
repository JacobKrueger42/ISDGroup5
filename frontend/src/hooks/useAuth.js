import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFetch } from '#hooks';

export default function useAuth() {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    const { get, post } = useFetch();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await Promise.allSettled([getSessionAsync(), getUserAsync()]);
            setLoading(false);
        }

        fetchData();
    }, []);

    async function loginAsync(email, password) {
        try {
            const res = await post('auth/login', {
                email: email,
                password: password
            });

            setError(null);
            navigate(res.redirect_uri);
            return true;
        } catch (error) {
            setError(error);
            return false;
        }
    }

    async function logoutAsync() {
        const res = await post('auth/logout');
        return navigate(res.redirect_uri);
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
        resetPasswordAsync
    };
}
