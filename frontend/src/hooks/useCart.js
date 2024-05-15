import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'; // Correct import path

export function useCart() {
    const { cartItems, dispatch } = useContext(CartContext);

    const addToCart = (product, quantity) => {
        console.log('adding: ', { name: product.name, quantity });
        dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
    };

    const updateCartItem = (productId, quantity) => {
        console.log('updating: ', { id: productId, quantity });
        dispatch({ type: 'UPDATE_ITEM', payload: { productId, quantity } });
    };

    const removeCartItem = productId => {
        console.log('removing: ', { id: productId });
        dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    };

    const clearCart = () => {
        console.log('clearing everything');
        dispatch({ type: 'CLEAR_CART' });
    };

    return {
        cartItems,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart
    };
}
