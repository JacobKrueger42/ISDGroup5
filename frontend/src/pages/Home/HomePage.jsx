import { bannerPlaceholder } from '#assets';
import { Layout } from '#components';
import { useAuth } from '#hooks';
import { Alert, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    return (
        <Layout
            title='IoT Bay'
            headerContent={<Greeter />}
            headerActions={<Actions />}
        >
            <img loading='lazy' src={bannerPlaceholder} alt='Homepage Banner' />
        </Layout>
    );
}

function Greeter() {
    const { error, user } = useAuth();

    return (
        <>
            <Typography variant='body1'>
                {user
                    ? `Welcome ${user.firstName}, 👋`
                    : 'Welcome, please login or create an account'}
            </Typography>
            {user && error && (
                <Alert sx={{ margin: 4 }} severity='error'>
                    {error.message}
                </Alert>
            )}
            <Typography variant='body2' color='text.secondary'>
                Bringing you the best products for all things IoT
            </Typography>
        </>
    );
}

function Actions() {
    const navigate = useNavigate();

    return (
        <>
            <Button variant='contained' onClick={() => navigate('/catalogue')}>
                Shop Now
            </Button>
            <Button variant='outlined' onClick={() => navigate('/cart')} style={{ marginLeft: '10px' }}>
                View Cart
            </Button>
            <Button variant='outlined' onClick={() => navigate('/checkout')} style={{ marginLeft: '10px' }}>
                Checkout
            </Button>
        </>
    );
}