import { useContext } from 'react';
import { useAuth, useFetch, useServer } from '#hooks';
import { CartContext } from '../contexts/CartContext';

const useCheckout = () => {
    const { state, dispatch } = useContext(CartContext);
    const { isLoading, shouldRefresh, makeServerChange } = useServer();
    const { post } = useFetch();

    const checkout = async () => {
        try {
            const disableRefresh = true
            makeServerChange(
                // client side pagination for simplicity
                async () => await post('checkout', { items: state.items }),
                response => {
                    console.log('Checkout successful', response.data);
                    dispatch({ type: 'CLEAR_CART' });
                },
                disableRefresh
            );
        } catch (error) {
            console.error('Checkout failed', error);
        }
    };

    return checkout;
};

export default useCheckout;
