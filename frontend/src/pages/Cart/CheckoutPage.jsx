import React from 'react';
import { Typography, Button, List, ListItem, ListItemText, TextField, Grid, Paper, Box } from '@mui/material';
import { useCart } from '../../contexts/CartContext';
import { Layout } from '#components';
import { useCheckout } from '#hooks';

export default function CheckoutPage() {
    const { state } = useCart();
    const checkout = useCheckout();

    const handleCheckout = () => {
        checkout();
    };

    return (
        <Layout
            title="Checkout"
            headerContent={<Typography variant="h4">Checkout</Typography>}
        >
            <Grid container spacing={2} style={{ marginTop: '2rem' }}>
                <Grid item xs={12} md={8}>
                    <Paper style={{ padding: '1rem' }}>
                        <Typography variant="h5" gutterBottom>
                            Order Summary
                        </Typography>
                        <List>
                            {state.items.length > 0 ? (
                                state.items.map(item => (
                                    <ListItem key={item.productId} divider>
                                        <ListItemText primary={item.product.name} secondary={`$${item.product.price}`} />
                                        <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                    </ListItem>
                                ))
                            ) : (
                                <Typography>Your cart is empty.</Typography>
                            )}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper style={{ padding: '1rem' }}>
                        <Typography variant="h5" gutterBottom>
                            Payment Details
                        </Typography>
                        <Box component="form" noValidate autoComplete="off">
                            <TextField
                                label="Name on Card"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Card Number"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Expiry Date"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="CVV"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCheckout}
                                style={{ marginTop: '1rem' }}
                                fullWidth
                            >
                                Confirm Checkout
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}
