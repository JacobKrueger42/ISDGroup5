import { ProfileMenu, Sidebar } from '#components';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import SellIcon from '@mui/icons-material/Sell';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar({ user, onLogout, isLoading }) {
    const navigate = useNavigate();

    const sidebarMenu = [
        { text: 'Home', link: '/home', role: 'CUSTOMER', icon: <HomeIcon /> },
        {
            text: 'Catalogue',
            link: '/catalogue',
            role: 'CUSTOMER',
            icon: <SellIcon />
        },
        {
            text: 'Manage Products',
            link: '/product-management',
            role: 'STAFF',
            icon: <InventoryIcon />
        },
        {
            text: 'Manage Catalogue',
            link: '/catalogue-management',
            role: 'STAFF',
            icon: <InventoryIcon />
        }
    ];

    const profileMenu = [
        { text: 'My Account', link: '/account' },
        { text: 'My Access Logs', link: '/accesslogs' },
        { text: 'Logout', onClick: onLogout }
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <Sidebar navigationItems={sidebarMenu} />
                    <Button
                        sx={{ flexGrow: 1 }}
                        variant='text'
                        onClick={() => navigate('/home')}
                    >
                        <Typography variant='h6' color='white'>
                            IoT Bay
                        </Typography>
                    </Button>
                    {user && <ProfileMenu items={profileMenu} />}
                    {!user && (
                        <Button
                            color='inherit'
                            sx={{ color: '#fff' }}
                            disabled={isLoading}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
