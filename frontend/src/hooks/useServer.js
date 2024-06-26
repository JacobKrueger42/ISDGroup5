import { useState, useEffect } from 'react';

export default function useServer() {
    const [shouldRefresh, setRefresh] = useState(false);
    const toggleRefresh = () => {
        console.log('server event has triggered a refresh...');
        setRefresh(true);
    };

    // little hacky, but this ensures listeners can use the bool flag as expected
    // this results in a "pulse" to consumers that can trigger a short-term effect
    useEffect(() => {
        setRefresh(false);
    }, [shouldRefresh]);

    const [isLoading, setLoading] = useState(true);

    async function makeServerChange(serverFn, syncCallback, disableRefresh) {
        const _disableRefresh = disableRefresh ?? false;
        try {
            const result = await serverFn();
            !_disableRefresh && toggleRefresh();
            setLoading(false);
            syncCallback(result);
            return { success: true, error: null };
        } catch (error) {
            setLoading(false);
            return { success: false, error: error };
        }
    }

    return {
        isLoading,
        shouldRefresh,
        makeServerChange
    };
}
