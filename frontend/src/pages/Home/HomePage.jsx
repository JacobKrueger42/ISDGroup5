import { useAuth } from '#hooks';
import { Alert, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import MenuAppBar from '../../components/MenuAppBar';
import { bannerPlaceholder } from '#assets';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { isLoading, error, getUserAsync, logoutAsync } = useAuth();

    useEffect(() => {
        (async () => {
            const user = await getUserAsync();

            console.log('not logged in, redirecting to anon page');
            if (!user) navigate('/');

            setUser(user);
        })();
    }, []);

    const handleShopNow = () => {
        navigate('/shop');
    };

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
                    display: 'flex', // Using flex display
                    flexDirection: 'row', // Align children in a row
                    alignItems: 'stretch', // Stretch items to fill the container height
                    height: '40vh', // Full viewport height
                    justifyContent: 'space-between' // This will add space between the flex items
                }}
            >
                <Card
                    sx={{
                        flexGrow: 1, // Allow card to grow to fill the space
                        width: 'calc(50% - 10px)'
                    }}
                    variant='outlined'
                >
                    <CardHeader title='IoT Bay' />
                    <CardContent>
                        <Typography variant='body1'>
                            {user
                                ? `Welcome ${user.firstName}, 👋`
                                : 'Welcome, please login or create an account'}
                        </Typography>
                    </CardContent>
                    {/* don't show auth errors if the user isn't logged in - keep the landing page clean */}
                    {user && error && (
                        <Alert sx={{ margin: 4 }} severity='error'>
                            {error.message}
                        </Alert>
                    )}
                    <CardContent>
                        <Typography variant='body2' color='text.secondary'>
                            Bringing you the best products for all things IoT
                        </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                        <Button
                            variant='contained'
                            onClick={handleShopNow}
                        >
                            Shop Now
                        </Button>
                    </CardActions>
                </Card>
                <img
                    src={bannerPlaceholder}
                    alt='Homepage Banner'
                    style={{
                        flexGrow: 1, // Allow image to grow to fill the space
                        width: '50%', // Start with 50% of the space
                        height: '100%', // Full height of the container
                        objectFit: 'cover' // Cover the space without stretching the image
                    }}
                />
            </div>
        </>
    );
}
