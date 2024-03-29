import { useAuth } from '#hooks';
import { Alert, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const { isLoading, error, user, logoutAsync } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            console.warn('user not logged in, redirecting to login page');
            navigate('/login');
        }
    });

    const handleLogout = async e => {
        e.preventDefault();
        await logoutAsync();
    };

    return (
        <Card sx={{ minWidth: 500 }} variant='outlined'>
            <CardHeader title='IoT Bay' />
            <CardContent>
                <Typography variant='body1'>
                    Welcome {user?.firstName ?? '<Unknown>'}, 👋
                </Typography>
            </CardContent>
            <br />
            {error && <Alert severity='error'>{error.message}</Alert>}
            <br />
            <CardActions>
                <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    fullWidth
                    disabled={isLoading}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </CardActions>
        </Card>
    );
}
