import { useAuth } from '#hooks';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// navigationItems:
// { text: 'Click me!', link: '/go-here', role: 'CUSTOMER', icon: ImportedIcon }
export default function Sidebar({ navigationItems }) {
    const [open, setOpen] = useState(false);

    return (
        <IconButton
            size='large'
            color='inherit'
            sx={{ mr: 2 }}
            onClick={() => setOpen(!open)}
        >
            <MenuIcon />
            <Drawer open={open} onClose={() => setOpen(false)}>
                <DrawItems items={navigationItems ?? []} setOpen={setOpen} />
            </Drawer>
        </IconButton>
    );
}

function DrawItems({ setOpen, items }) {
    const { isLoading, user } = useAuth();
    const navigate = useNavigate();

    const customerItems = items?.filter(item => item.role === 'CUSTOMER') ?? [];
    const staffItems =
        items?.filter(
            item =>
                (user?.role === 'ADMIN' || user?.role === 'STAFF') &&
                item.role === 'STAFF'
        ) ?? [];
    const adminItems =
        items?.filter(
            item => user?.role === 'ADMIN' && item.role === 'ADMIN'
        ) ?? [];

    return (
        <Box
            sx={{ width: 250, padding: 4 }}
            role='presentation'
            onClick={() => setOpen(false)}
        >
            <Stack
                direction='row'
                spacing={2}
                flexWrap='wrap'
                alignItems='center'
                sx={{ mb: 4 }}
            >
                <IconButton
                    size='small'
                    color='inherit'
                    onClick={() => navigate('/home')}
                >
                    <StorefrontIcon />
                </IconButton>
                <Button
                    fullwidth
                    sx={{ flexGrow: 1 }}
                    variant='text'
                    onClick={() => navigate('/home')}
                >
                    <Typography variant='subtitle2'>IoT Bay</Typography>
                </Button>

                <IconButton
                    size='small'
                    color='inherit'
                    onClick={() => setOpen(!open)}
                >
                    <CloseIcon />
                </IconButton>
            </Stack>
            <List>
                {customerItems.map((item, index) =>
                    isLoading ? (
                        <Skeleton key={index}>
                            <DrawItem item={item} navigate={navigate} />
                        </Skeleton>
                    ) : (
                        <DrawItem item={item} key={index} navigate={navigate} />
                    )
                )}
            </List>
            {staffItems.length > 0 && <Divider />}
            {staffItems.length > 0 && (
                <Typography variant='overline'>Staff</Typography>
            )}
            <List>
                {staffItems.map((item, index) =>
                    isLoading ? (
                        <Skeleton key={index}>
                            <DrawItem item={item} navigate={navigate} />
                        </Skeleton>
                    ) : (
                        <DrawItem item={item} key={index} navigate={navigate} />
                    )
                )}
            </List>
            {adminItems.length > 0 && <Divider />}
            {adminItems.length > 0 && (
                <Typography variant='overline'>Admin</Typography>
            )}
            <List>
                {adminItems.map((item, index) =>
                    isLoading ? (
                        <Skeleton key={index}>
                            <DrawItem item={item} navigate={navigate} />
                        </Skeleton>
                    ) : (
                        <DrawItem item={item} key={index} navigate={navigate} />
                    )
                )}
            </List>
        </Box>
    );
}

function DrawItem({ item, navigate }) {
    return (
        <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.link)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItemButton>
        </ListItem>
    );
}
