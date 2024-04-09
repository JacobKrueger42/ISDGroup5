import { MenuAppBar } from '#components';
import { useAuth } from '#hooks';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthorisedPageShell({ children }) {
    const navigate = useNavigate();

    const { isLoading, getUserAsync } = useAuth();

    useEffect(() => {
        (async () => {
            const user = await getUserAsync();
            if (user) navigate('/home');
        })();
    }, []);

    return (
        <Stack spacing={2}>
            <MenuAppBar
                user={null}
                onLogout={() => Promise.resolve('no-op')}
                isLoading={isLoading}
            />
            {/* page content */}
            {children}
        </Stack>
    );
}
