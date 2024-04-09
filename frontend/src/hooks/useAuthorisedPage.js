import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '#hooks';

export default function useAuthorisedPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            if (!user) {
                console.log('not logged in, redirecting to anon page');
                navigate('/');
            }
        })();
    }, [user]);

    return {};
}
