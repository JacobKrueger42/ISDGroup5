import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { useEffect } from 'react';
import MenuAppBar from '../../components/MenuAppBar';
import { bannerPlaceholder } from '#assets';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '#hooks';

export default function AnonPage() {
    const navigate = useNavigate();
    const { getUserAsync } = useAuth();

    useEffect(() => {
        (async () => {
            const user = await getUserAsync();
            if (user) navigate('/home');
        })();
    }, []);

    const handleShopNow = () => {
        navigate('/shop');
    };

    return (
        <>
            <MenuAppBar />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                height: '40vh',
                justifyContent: 'space-between',
            }}>
                <Card sx={{ flexGrow: 1, width: 'calc(50% - 10px)' }} variant='outlined'>
                    <CardHeader title='Explore IoT Bay' />
                    <CardContent>
                        <Typography variant='h5' component="div">
                            Explore the Future of Technology
                        </Typography>
                        <Typography variant='body2' color="text.secondary">
                            Discover how our cutting-edge IoT solutions can transform your daily life.
                        </Typography>
                        </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                        <Button variant="contained" onClick={handleShopNow}>Shop Now</Button>
                    </CardActions>
                </Card>
                <img
                    src={bannerPlaceholder}
                    alt="Anon Page Banner"
                    style={{
                        flexGrow: 1,
                        width: '50%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
        </>
    );
}
