// src/pages/Cart/CartPage.jsx
import React from 'react';
import { Typography, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useCart } from '../../contexts/CartContext'; // Adjust the import path as necessary
import { Layout } from '#components'; // Ensure Layout is a reusable component that accepts children
import { bannerPlaceholder } from '#assets'; 
import { useCheckout } from '#hooks'; // Correct the import statement

export default function CartPage() {
    const { state, dispatch } = useCart();
    const checkout = useCheckout();

    const handleRemoveClick = (productId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    };

    const handleQuantityChange = (event, productId) => {
        const quantity = parseInt(event.target.value, 10);
        if (quantity > 0) {
            dispatch({ type: 'UPDATE_ITEM', payload: { productId, quantity } });
        }
    };

    return (
        <Layout
            title="Your Cart"
            headerContent={<Typography variant="h4">Shopping Cart</Typography>}
            headerActions={<Actions checkout={checkout} />}
        >
            <img loading="lazy" src={bannerPlaceholder} alt="Shopping Cart Banner" style={{ width: '100%' }} />
            <List>
                {state.items.length > 0 ? (
                    state.items.map(item => (
                        <ListItem key={item.productId} divider>
                            <ListItemText primary={item.product.name} secondary={`$${item.product.price}`} />
                            <TextField
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(e, item.productId)}
                                inputProps={{ min: 1, style: { width: '50px' } }}
                            />
                            <Button variant="contained" color="error" onClick={() => handleRemoveClick(item.productId)}>
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

function Actions({ checkout }) {
    return (
        <Button variant="contained" color="primary" onClick={checkout} style={{ marginLeft: 'auto' }}>
            Proceed to Checkout
        </Button>
    );
}
