import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFetch } from '#hooks';

export default function useAuth() {
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

    async function loginAsync(username, password) {
        const res = await post('auth/login', {
            username: username,
            password: password
        });

        return navigate(res.redirect_uri);
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
        try {
            const user = await get('user');
            setUser(user);
        } catch (error) {
            console.log(error.redirectUri);
            return navigate(error.redirectUri);
        }
    }

    return {
        isLoading,
        user,
        session,
        loginAsync,
        logoutAsync,
        resetPasswordAsync
    };
}
