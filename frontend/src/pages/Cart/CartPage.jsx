import React from 'react';
import { useCart } from '../../hooks/useCart';

const CartPage = () => {
    const { cartItems, updateCartItem, removeCartItem, isLoading } = useCart();

    if (isLoading) return <p>Loading...</p>; // Show loading state while fetching cart items

    const handleRemoveClick = (itemId) => {
        removeCartItem(itemId);
    };

    const handleQuantityChange = (event, itemId) => {
        updateCartItem(itemId, parseInt(event.target.value));
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.product.name} - 
                            Quantity: 
                            <input 
                                type="number" 
                                value={item.quantity} 
                                onChange={(event) => handleQuantityChange(event, item.id)}
                            />
                            <button onClick={() => handleRemoveClick(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
