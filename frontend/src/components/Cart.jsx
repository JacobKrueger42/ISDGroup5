import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem'; // Make sure CartItem is also correctly placed and imported

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios.get('/api/cart', { params: { userId: 1 } })  // This is just an example
            .then(response => setCartItems(response.data))
            .catch(err => console.error('Error fetching cart items:', err));
    }, []);

    return (
        <div>
            {cartItems.map(item => (
                <CartItem key={item.productId} item={item} />
            ))}
        </div>
    );
};

export default Cart;
