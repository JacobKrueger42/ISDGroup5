import { useContext } from 'react';
import { useFetch, useServer } from '#hooks';
import { CartContext } from '../contexts/CartContext';

const useCheckout = () => {
    const { state, dispatch } = useContext(CartContext);
    const { isLoading, makeServerChange } = useServer();
    const { post } = useFetch();

    const checkout = async () => {
        try {
            const disableRefresh = true;
            makeServerChange(
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

    return { checkout, isLoading };
};

export default useCheckout;
