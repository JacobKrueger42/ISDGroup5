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

export default function RegisterPage() {
    const { isLoading, error, registerAsync } = useAuth({ skipLoading: true });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
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
        await registerAsync(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password,
            formData.phone
        );
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
            <CardHeader title='Register to IotBay' />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className='textfields'>
                        <TextField
                            name='firstName'
                            label='First Name'
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                            disabled={isLoading}
                            error={!!error}
                            sx={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            name='lastName'
                            label='Last Name'
                            value={formData.lastName}
                            onChange={handleChange}
                            fullWidth
                            disabled={isLoading}
                            error={!!error}
                            sx={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            name='email'
                            label='Email Address'
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            disabled={isLoading}
                            error={!!error}
                            noValidate
                            sx={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            name='password'
                            label='Password'
                            type='password'
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            disabled={isLoading}
                            error={!!error}
                            sx={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            name='phone'
                            label='Phone'
                            type='tel'
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            disabled={isLoading}
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
                            Register
                        </Button>
                    </CardActions>
                    {error && (
                        <Alert sx={{ margin: 4 }} severity='error'>
                            {error.message}
                        </Alert>
                    )}
                </form>
                <Typography variant='body2' align='center'>
                    Already have an account? <Link to='/login'>Log in</Link>
                </Typography>
            </CardContent>
        </Card>
    );
}
