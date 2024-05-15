import { useState } from 'react';
import { Layout } from '#components';
import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Grid,
    useTheme
} from '@mui/material';
import usePayment from '../../hooks/usePayment'; // Adjust the import path as needed

export default function Checkout() {
    const { makePayment, isLoading, error, paymentSuccess } = usePayment();
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardPin: '',
        expirationDate: '',
        paymentMethod: '',
    });
    const theme = useTheme();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await makePayment(paymentDetails);
    };

    return (
        <Layout
            title='Checkout'
            headerContent={
                <>
                    <Typography variant='h5' component='div'>
                        Please proceed to payment:
                    </Typography>
                </>
            }
        >
            <Box
                sx={{
                    padding: 2,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Typography variant='h4'>Payment Details</Typography>
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel id='payment-method-label' sx={{ color: 'inherit' }}>Payment Method</InputLabel>
                    <Select
                        labelId='payment-method-label'
                        id='payment-method'
                        name='paymentMethod'
                        value={paymentDetails.paymentMethod}
                        label='Payment Method'
                        onChange={handleChange}
                        sx={{ backgroundColor: '#fff' }}
                    >
                        <MenuItem value={'Visa'}>Visa</MenuItem>
                        <MenuItem value={'Mastercard'}>Mastercard</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    sx={{ marginTop: 2, backgroundColor: '#fff' }}
                    id='card-number'
                    name='cardNumber'
                    label='Card Number'
                    variant='outlined'
                    value={paymentDetails.cardNumber}
                    onChange={handleChange}
                />
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id='card-pin'
                            name='cardPin'
                            label='Card Pin'
                            variant='outlined'
                            value={paymentDetails.cardPin}
                            onChange={handleChange}
                            sx={{ backgroundColor: '#fff' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id='expiration-date'
                            name='expirationDate'
                            label='Expiration Date'
                            variant='outlined'
                            value={paymentDetails.expirationDate}
                            onChange={handleChange}
                            sx={{ backgroundColor: '#fff' }}
                        />
                    </Grid>
                </Grid>
                <Button
                    fullWidth
                    sx={{ marginTop: 2 }}
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    Submit Payment
                </Button>
                {error && (
                    <Typography variant='body2' color='error' sx={{ marginTop: 2 }}>
                        {error.message}
                    </Typography>
                )}
                {paymentSuccess && (
                    <Typography variant='body2' color='success' sx={{ marginTop: 2 }}>
                        Payment Successful!
                    </Typography>
                )}
            </Box>
        </Layout>
    );
}
