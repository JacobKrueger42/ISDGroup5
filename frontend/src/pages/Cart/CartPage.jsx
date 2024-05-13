import React from 'react';
import { Typography, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useCart } from '#hooks'; // Adjust the import path as necessary
import { Layout } from '#components'; // Ensure Layout is a reusable component that accepts children
import { bannerPlaceholder } from '#assets'; // Make sure the path is correct

export default function CartPage() {
    const { cartItems, updateCartItem, removeCartItem, isLoading } = useCart();

    if (isLoading) return <Typography>Loading...</Typography>;

    const handleRemoveClick = itemId => {
        removeCartItem(itemId);
    };

    const handleQuantityChange = (event, itemId) => {
        updateCartItem(itemId, parseInt(event.target.value));
    };

    return (
        <Layout
            title="Your Cart"
            headerContent={<Typography variant="h4">Shopping Cart</Typography>}
            headerActions={<Actions />}
        >
            <img loading="lazy" src={bannerPlaceholder} alt="Shopping Cart Banner" style={{ width: '100%' }} />
            <List>
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <ListItem key={item.id} divider>
                            <ListItemText primary={item.product.name} secondary={`$${item.product.price}`} />
                            <TextField
                                type="number"
                                value={item.quantity}
                                onChange={(event) => handleQuantityChange(event, item.id)}
                                inputProps={{ min: 1, style: { width: '50px' } }}
                            />
                            <Button variant="contained" color="error" onClick={() => handleRemoveClick(item.id)}>
                                Remove
                            </Button>
                        </ListItem>
                    ))
                ) : (
                    <Typography>Your cart is empty.</Typography>
                )}
            </List>
        </Layout>
    );
}

function Actions() {
    return (
        <Button variant="contained" color="primary" style={{ marginLeft: 'auto' }}>
            Proceed to Checkout
        </Button>
    );
}
