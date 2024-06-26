import { useAuth } from '#hooks';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const { isLoading, error, loginAsync } = useAuth({ skipLoading: true });

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await loginAsync(formData.email, formData.password);
    };

    return (
        <Card
            sx={{
                width: '400px',
                padding: '20px',
                margin: 'auto',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
            }}
            variant='outlined'
            className='p-6'
        >
            <CardHeader title='Login to IotBay' />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className='textfields'>
                        <TextField
                            name='email'
                            label='Email Address'
                            type='email'
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                            fullWidth
                            required
                            error={!!error}
                            sx={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            name='password'
                            label='Password'
                            type='password'
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLoading}
                            fullWidth
                            required
                            error={!!error}
                            sx={{ marginBottom: '1rem' }}
                        />
                    </div>
                    <CardActions>
                        <Button
                            type='submit'
                            variant='contained'
                            size='medium'
                            color='primary'
                            fullWidth
                            disabled={isLoading}
                        >
                            Login
                        </Button>
                    </CardActions>
                    {error && (
                        <Alert sx={{ margin: 4 }} severity='error'>
                            {error.message}
                        </Alert>
                    )}
                </form>
                <Typography variant='body2' align='center'>
                    Don't have an account? <Link to='/register'>Sign up</Link>
                </Typography>
            </CardContent>
        </Card>
    );
}
