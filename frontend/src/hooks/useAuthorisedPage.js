import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '#hooks';

export default function useAuthorisedPage() {
    const navigate = useNavigate();
    const { getUserAsync } = useAuth();

    useEffect(() => {
        (async () => {
            const user = await getUserAsync();

            console.log('not logged in, redirecting to anon page');
            if (!user) navigate('/');
        })();
    }, []);

    return {};
}
