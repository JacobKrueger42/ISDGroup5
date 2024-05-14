import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'; 

export function useCart() {
  const { state, dispatch } = useContext(CartContext);

  const addToCart = (product, quantity) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
  };

  const updateCartItem = (productId, quantity) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { productId, quantity } });
  };

<<<<<<< Updated upstream
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity }]);
        }
    };

    const updateCartItem = (productId, quantity) => {
        setCartItems(cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const removeCartItem = (productId) => {
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
=======
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
>>>>>>> Stashed changes
