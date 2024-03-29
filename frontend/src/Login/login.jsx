import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function LoginPage() {
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

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData);
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
                            fullWidth
                            required
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
                        >
                            Login
                        </Button>
                    </CardActions>
                </form>
                <Typography variant='body2' align='center'>
                    Don't have an account? <a href='/'>Sign up</a>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default LoginPage;
