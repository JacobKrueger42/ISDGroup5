import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
    const navigate = useNavigate();

    return (
        <Box
            sx={{ width: 250, padding: 4 }}
            role='presentation'
            display='flex'
            flexDirection='column'
            onClick={() => setOpen(false)}
        >
            <IconButton
                size='small'
                color='inherit'
                sx={{ mr: 2, alignSelf: 'flex-end' }}
                onClick={() => setOpen(!open)}
            >
                <CloseIcon />
            </IconButton>
            <List>
                {items &&
                    items
                        .filter(item => item.role === 'CUSTOMER')
                        .map((item, index) => (
                            <DrawItem
                                item={item}
                                key={index}
                                navigate={navigate}
                            />
                        ))}
            </List>
            <Divider />
            <Typography variant='overline'>Staff</Typography>
            <List>
                {items &&
                    items
                        .filter(item => item.role === 'STAFF')
                        .map((item, index) => (
                            <DrawItem
                                item={item}
                                key={index}
                                navigate={navigate}
                            />
                        ))}
            </List>
            <Divider />
            <Typography variant='overline'>Admin</Typography>
            <List>
                {items &&
                    items
                        .filter(item => item.role === 'ADMIN')
                        .map((item, index) => (
                            <DrawItem
                                item={item}
                                key={index}
                                navigate={navigate}
                            />
                        ))}
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
