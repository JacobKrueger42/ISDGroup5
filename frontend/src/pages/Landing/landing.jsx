import { bannerPlaceholder } from '#assets';
import { Layout } from '#components';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AnonPage() {
    const navigate = useNavigate();

    return (
        <Layout
            title='Explore IoT Bay'
            headerContent={
                <>
                    <Typography variant='h5' component='div'>
                        Explore the Future of Technology
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Discover how our cutting-edge IoT solutions can
                        transform your daily life.
                    </Typography>
                </>
            }
            headerActions={
                <>
                    <Button
                        variant='contained'
                        onClick={() => navigate('/catalogue')}
                    >
                        Shop Now
                    </Button>
                </>
            }
        >
            <img loading='lazy' src={bannerPlaceholder} alt='Homepage Banner' />
        </Layout>
    );
}
