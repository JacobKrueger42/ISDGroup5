import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem'; // Make sure CartItem is also correctly placed and imported

const Cart = () => {
    const [error, setError] = useState('');

    useEffect(() => {
    axios.get('/api/cart', { params: { userId: user.id } })
        .then(response => {
            setCartItems(response.data);
            setError('');  // Clear any previous errors on successful fetch
        })
        .catch(err => {
            console.error('Error fetching cart items:', err);
            setError('Failed to fetch cart items');  // Set user-friendly error message
        });
}, [user]);

    return (
        <div>
            {cartItems.map(item => (
                <CartItem key={item.productId} item={item} />
            ))}
        </div>
    );
};

export default Cart;
