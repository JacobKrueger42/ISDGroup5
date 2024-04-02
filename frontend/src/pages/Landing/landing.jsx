import { useAuth } from '#hooks';
import { useEffect } from 'react';
import { AppBar, Toolbar, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import MenuAppBar from '../../components/MenuAppBar';
import anonBanner from '../../assets/images/bannerPlaceholder.jpg';
import { useNavigate } from 'react-router-dom';


const AnonPage = () => {
    const { getUserAsync } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        const user = await getUserAsync();
        if (user) {
          navigate('/home'); // If there's a user, redirect to the HomePage
        }
        // No else block needed; stay on this page if not authenticated
      })();
    }, [getUserAsync, navigate]);

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
                    src={anonBanner} 
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
};

export default AnonPage;
