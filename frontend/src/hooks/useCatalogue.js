import { useFetch, useServer } from '#hooks';
import { useEffect, useState } from 'react';

export default function useCatalogue() {
    const { isLoading, shouldRefresh, makeServerChange } = useServer();

    const [catalogue, setCatalogue] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { get } = useFetch();

    useEffect(() => {
        (async () => {
            const disableRefresh = true;
            makeServerChange(
                // client side pagination for simplicity
                async () => await get('catalogue/list?take=50'),
                catalogue => {
                    console.log(
                        `loaded ${catalogue.totalCount} catalogue entries`
                    );
                    setCatalogue(catalogue.results);
                    setTotalCount(catalogue.totalCount);
                },
                disableRefresh
            );
        })();
    }, [shouldRefresh]);

    return {
        catalogue: catalogue,
        totalCount: totalCount,
        isLoading: isLoading
    };
}
