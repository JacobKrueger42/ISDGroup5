import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'; // Correct import path

export function useCart() {
  const { state, dispatch } = useContext(CartContext);

  const addToCart = (product, quantity) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
  };

  const updateCartItem = (productId, quantity) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { productId, quantity } });
  };

  const removeCartItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return {
    cartItems: state.items,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
  };
}