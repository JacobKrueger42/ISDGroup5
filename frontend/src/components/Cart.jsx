import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    function loadCartItems() {
        // Load cart items from localStorage
        try {
            const savedCart = localStorage.getItem('cartItems');
            const items = savedCart ? JSON.parse(savedCart) : [];
            setCartItems(items);
            setError('');  // Clear any previous errors on successful fetch
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setError('Failed to fetch cart items');  // Set user-friendly error message
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadCartItems();
    }, []);

    if (isLoading) return <div>Loading cart items...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {cartItems.length > 0 ? (
                cartItems.map(item => (
                    <CartItem key={item.productId} item={item} />
                ))
            ) : (
                <div>Your cart is empty.</div>
            )}
        </div>
    );
};

export default Cart;
