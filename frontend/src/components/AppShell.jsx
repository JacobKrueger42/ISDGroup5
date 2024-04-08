import { useState, useEffect } from 'react';
import { useAuth } from '#hooks';
// import { useAuth, useAuthorisedPage } from '#hooks';
import { MenuAppBar } from '#components';

export default function AppShell({ children }) {
    const [user, setUser] = useState(null);

    // executing the hook applies the page auth requirement
    // useAuthorisedPage();

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
        <>
            <MenuAppBar
                user={user}
                onLogout={handleLogout}
                logoutAsync={logoutAsync}
                isLoading={isLoading}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    height: '40vh',
                    justifyContent: 'space-between'
                }}
            >
                {/* page content */}
                {children}
            </div>
        </>
    );
}
