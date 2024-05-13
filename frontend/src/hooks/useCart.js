import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch, useServer, useAuth } from '#hooks';

export function useCart() {
    const { get, post, put, del } = useFetch();
    const { makeServerChange } = useServer();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadCartItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await get('/cart');
            setCartItems(result.data);
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        } finally {
            setIsLoading(false);
        }
    }, [get]);

    useEffect(() => {
        if (user) {
            loadCartItems();
        }
    }, [user, loadCartItems]);

    const addToCart = async (productId, quantity) => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await post('/cart/add', { productId, quantity });
            loadCartItems(); // Refresh cart items after adding
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            await put(`/cart/update/${itemId}`, { quantity });
            loadCartItems(); // Refresh cart items after update
        } catch (error) {
            console.error('Failed to update cart item:', error);
        }
    };

    const removeCartItem = async (itemId) => {
        try {
            await del(`/cart/delete/${itemId}`);
            loadCartItems(); // Refresh cart items after removal
        } catch (error) {
            console.error('Failed to remove cart item:', error);
        }
    };

    return {
        cartItems,
        addToCart,
        updateCartItem,
        removeCartItem,
        isLoading
    };
}
