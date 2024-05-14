import { MenuAppBar } from '#components';
import { useAuth } from '#hooks';
import Stack from '@mui/material/Stack';

export default function AuthorisedPageShell({ children }) {
    // still attempt to load the user - as the page may be visited by a logged in user
    const { isLoading, user, logoutAsync } = useAuth();

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
