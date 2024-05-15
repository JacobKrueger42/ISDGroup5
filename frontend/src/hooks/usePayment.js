import { useState } from 'react';
import useFetch from './useFetch'; // Ensure this path is correct

const usePayment = () => {
    const { post } = useFetch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const makePayment = async (paymentDetails) => {
        setIsLoading(true);
        try {
            const response = await post('payment', paymentDetails);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { makePayment, isLoading, error };
};

export default usePayment;
