import { useState } from 'react';

export default function useServer() {
    const [shouldRefresh, setRefresh] = useState(false);
    const toggleRefresh = () => {
        setRefresh(!shouldRefresh);
    };

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
