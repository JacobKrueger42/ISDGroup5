import { useState, useEffect } from 'react';

export function useCart() {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            console.log('item already in cart, updating quantity', {
                name: existingItem.name,
                quantity: existingItem.quantity + quantity
            });
            setCartItems(
                cartItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            console.log('item added to cart for first time', {
                name: product.name,
                quantity
            });
            setCartItems([...cartItems, { ...product, quantity }]);
        }
    };

    const updateCartItem = (productId, quantity) => {
        setCartItems(
            cartItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const removeCartItem = productId => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return {
        cartItems,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart
    };
}
