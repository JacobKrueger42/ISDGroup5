import { MenuAppBar } from '#components';
import { useAuth, useAuthorisedPage } from '#hooks';
import Stack from '@mui/material/Stack';

export default function AuthorisedPageShell({ children }) {
    // executing the hook applies the page auth requirement
    useAuthorisedPage();

    const { isLoading, user, logoutAsync } = useAuth();

    const handleLogout = async e => {
        e.preventDefault();
        await logoutAsync();
    };

    return (
        <Stack spacing={2}>
            <MenuAppBar
                user={user}
                onLogout={handleLogout}
                isLoading={isLoading}
            />
            {/* page content */}
            {children}
        </Stack>
    );
}
