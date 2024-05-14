import { useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';

const useCheckout = () => {
    const { state, dispatch } = useContext(CartContext);

    const checkout = async () => {
        try {
            const response = await axios.post('/api/checkout', { items: state.items });
            console.log('Checkout successful', response.data);
            dispatch({ type: 'CLEAR_CART' });
        } catch (error) {
            console.error('Checkout failed', error);
        }
    };

    return checkout;
};

export default useCheckout;
