import { MenuAppBar } from '#components';
import { useAuth } from '#hooks';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthorisedPageShell({ children }) {
    const navigate = useNavigate();
    const { isLoading, user, logoutAsync } = useAuth();

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            console.log('not logged in, redirecting to anon page');
            navigate('/');
        }
    });

    return (
        <Stack spacing={2}>
            <MenuAppBar
                user={user}
                onLogout={logoutAsync}
                isLoading={isLoading}
            />
            {/* page content */}
            {children}
        </Stack>
    );
}
