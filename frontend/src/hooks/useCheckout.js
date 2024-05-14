import { useContext } from 'react';
import { useAuth, useFetch, useServer } from '#hooks';
import { CartContext } from '../contexts/CartContext';

const useCheckout = () => {
    const { state, dispatch } = useContext(CartContext);
    const { isLoading, shouldRefresh, makeServerChange } = useServer();
    const { post } = useFetch();

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
