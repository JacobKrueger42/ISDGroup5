// src/contexts/CartContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  items: [],
};

// Create context
const CartContext = createContext(initialState);

// Reducer to manage state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingIndex = state.items.findIndex(item => item.productId === action.payload.productId);
      if (existingIndex >= 0) {
        const items = [...state.items];
        items[existingIndex] = {
          ...items[existingIndex],
          quantity: items[existingIndex].quantity + action.payload.quantity
        };
        return { ...state, items };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload.productId)
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
        )
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

// Make sure to export CartContext for direct use if needed
export { CartContext };