import { MenuAppBar } from '#components';
import Stack from '@mui/material/Stack';

export default function AuthorisedPageShell({ children }) {
    return (
        <Stack spacing={2}>
            <MenuAppBar user={null} onLogout={() => Promise.resolve('no-op')} />
            {/* page content */}
            {children}
        </Stack>
    );
}
