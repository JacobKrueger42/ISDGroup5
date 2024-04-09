import { useState, useEffect } from 'react';
import { useAuth, useAuthorisedPage } from '#hooks';
import { MenuAppBar } from '#components';
import Stack from '@mui/material/Stack';

export default function AuthorisedPageShell({ children }) {
    const [user, setUser] = useState(null);

    // executing the hook applies the page auth requirement
    useAuthorisedPage();

    const { isLoading, getUserAsync, logoutAsync } = useAuth();

    useEffect(() => {
        (async () => {
            const user = await getUserAsync();
            setUser(user);
        })();
    }, []);

    const handleLogout = async e => {
        e.preventDefault();
        await logoutAsync();
    };

    return (
        <Stack spacing={2}>
            <MenuAppBar
                user={user}
                onLogout={handleLogout}
                logoutAsync={logoutAsync}
                isLoading={isLoading}
            />
            {/* page content */}
            {children}
        </Stack>
    );
}
