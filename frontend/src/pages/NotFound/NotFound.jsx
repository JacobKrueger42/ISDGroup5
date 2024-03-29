import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <>
            <h2>404 not found</h2>
            <Button
                variant='contained'
                size='medium'
                color='primary'
                fullWidth
                onClick={() => navigate('/')}
            >
                Back to home
            </Button>
        </>
    );
}
