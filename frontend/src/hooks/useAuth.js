import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFetch } from '#hooks';

const defaultOptions = { skipLoading: false };

export default function useAuth(options) {
    const opts = options ?? defaultOptions;

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { get, post, remove } = useFetch();

    useEffect(() => {
        (async () => {
            if (opts.skipLoading) {
                setLoading(false);
            } else {
                const user = await getUserAsync();
                setUser(user);
            }
        })();
    }, []);
   
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

    async function updateUserAsync({ id, firstName, lastName, email, phone }) {
        console.info('Updating user');
        try {
            setLoading(true);
            const res = await post(`user/${id}/update`, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            });

            setError(null);
            setLoading(false);

            console.log(res);
            return true;
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    async function removeUserAsync(id) {
        try {
            setLoading(true);
            console.log('Id' + id);
            const result = await remove(`user/${id}/remove`);
            logoutAsync();
            setLoading(false);
            console.log(result);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
    
    async function getLogsAsync(id) {
        try {
            console.log('at get logs');
            setLoading(true);
            const res = await get(`useraccesslog/${id}`);
            console.log(' after get logs');
            setLoading(false);
            console.log(res.results);
            return res.results;
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return {
        isLoading,
        error,
        user,
        loginAsync,
        logoutAsync,
        registerAsync,
        resetPasswordAsync,
        updateUserAsync,
        getUserAsync,
        setUser,
        removeUserAsync,
        getLogsAsync
    };
}
