import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// items:
// { text: 'Click me!', link?: '/go-here', onClick?: async () => {} }
export default function ProfileMenu({ items }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton size='large' onClick={handleMenu} color='inherit'>
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
                {items &&
                    items.map((item, index) => (
                        <ProfileMenuItem
                            item={item}
                            navigate={navigate}
                            onEventCallback={handleClose}
                            key={index}
                        />
                    ))}
            </Menu>
        </div>
    );
}

function ProfileMenuItem({ item, navigate, onEventCallback }) {
    const onEvent = async event => {
        item.link ? navigate(item.link) : await item.onClick(event);
        onEventCallback();
    };

    return <MenuItem onClick={onEvent}>{item.text}</MenuItem>;
}
