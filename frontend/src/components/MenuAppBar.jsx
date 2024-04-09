import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import Typography from '@mui/material/Typography';
import { Sidebar } from '#components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar({ user, logoutAsync, isLoading }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        await logoutAsync();
        handleClose();
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sidebarMenu = [
        { text: 'Home', link: '/home', role: 'CUSTOMER', icon: <HomeIcon /> },
        {
            text: 'Products',
            link: '/products',
            role: 'STAFF',
            icon: <InventoryIcon />
        }
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <Sidebar navigationItems={sidebarMenu} />
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        IoT Bay
                    </Typography>
                    {user && (
                        <div>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleMenu}
                                color='inherit'
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    My account
                                </MenuItem>
                                <MenuItem
                                    disabled={isLoading}
                                    onClick={handleLogoutClick}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
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
