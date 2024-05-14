<<<<<<< Updated upstream
// src/pages/Cart/CartPage.jsx
=======
>>>>>>> Stashed changes
import React from 'react';
import { Typography, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useCart } from '../../contexts/CartContext'; // Adjust the import path as necessary
import { Layout } from '#components'; // Ensure Layout is a reusable component that accepts children
import { bannerPlaceholder } from '#assets'; 
<<<<<<< Updated upstream
import { useNavigate } from 'react-router-dom'; // Import useNavigate
=======
import { useCheckout } from '#hooks'; // Correct the import statement
>>>>>>> Stashed changes

export default function CartPage() {
    const { cartItems, updateCartItem, removeCartItem } = useCart();

    const handleRemoveClick = (productId) => {
<<<<<<< Updated upstream
        dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
=======
        removeCartItem(productId);
>>>>>>> Stashed changes
    };

    const handleQuantityChange = (event, productId) => {
        const quantity = parseInt(event.target.value, 10);
        if (quantity > 0) {
            updateCartItem(productId, quantity);
        }
    };

    return (
        <Layout
            title="Your Cart"
            headerContent={<Typography variant="h4">Shopping Cart</Typography>}
<<<<<<< Updated upstream
            headerActions={<Actions navigate={navigate} />}
=======
            headerActions={<Actions />}
>>>>>>> Stashed changes
        >
            <img loading="lazy" src={bannerPlaceholder} alt="Shopping Cart Banner" style={{ width: '100%' }} />
            <List>
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <ListItem key={item.productId} divider>
<<<<<<< Updated upstream
                            <ListItemText primary={item.product.name} secondary={`$${item.product.price}`} />
=======
                            <ListItemText primary={item.name} secondary={`$${item.price}`} />
>>>>>>> Stashed changes
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

function Actions() {
    const navigate = useNavigate();

    return (
<<<<<<< Updated upstream
        <Button variant="contained" color="primary" onClick={handleProceedToCheckout} style={{ marginLeft: 'auto' }}>
=======
        <Button variant="contained" color="primary" onClick={() => navigate('/checkout')} style={{ marginLeft: 'auto' }}>
>>>>>>> Stashed changes
            Proceed to Checkout
        </Button>
    );
}