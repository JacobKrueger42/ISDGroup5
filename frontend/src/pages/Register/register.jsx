import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '#hooks';

export default function RegisterPage() {
    const { isLoading, error, registerAsync } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
        await registerAsync(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password
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
                            required
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
                            required
                            disabled={isLoading}
                            error={!!error}
                            sx={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            name='email'
                            label='Email Address'
                            type='email'
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={isLoading}
                            error={!!error}
                            sx={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            name='password'
                            label='Password'
                            type='password'
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
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
                    <br />
                    {error && <Alert severity='error'>{error.message}</Alert>}
                    <br />
                </form>
                <Typography variant='body2' align='center'>
                    Already have an account? <Link to='/login'>Log in</Link>
                </Typography>
            </CardContent>
        </Card>
    );
}
