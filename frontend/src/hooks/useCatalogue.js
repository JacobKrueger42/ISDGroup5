import { useFetch, useServer, useAuth } from '#hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useCatalogue() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const { isLoading, shouldRefresh, makeServerChange } = useServer();

    const [catalogue, setCatalogue] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [visibleCatalogue, setVisibleCatalogue] = useState([]);
    const [disableAddToCart, setDisableAddToCart] = useState(true);
    const [searchTerm, setSearchTerm] = useState(null);

    const { get } = useFetch();

    // const visibleRows = useMemo(() => {
    //     return rows
    //         .filter(row => (!searchTerm ? row : row.name === searchTerm))
    //         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //         .sort(getComparator(order, orderBy));

    //     // including rows in the deps array is a little hacky as we negate
    //     // the memo almost anytime we touch a row object
    // }, [order, orderBy, page, rowsPerPage, rows, searchTerm]);

    useEffect(() => {
        // we should only allow users to add to a cart if they're logged in
        setDisableAddToCart(!user);

        LoadCatalogue();

        // we only care to refresh when we toggle this flag
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldRefresh]);

    async function LoadCatalogue() {
        const disableRefresh = true;
        makeServerChange(
            // client side pagination for simplicity
            async () => await get('catalogue/list?take=50'),
            catalogue => {
                console.log(`loaded ${catalogue.totalCount} catalogue entries`);
                setCatalogue(catalogue.results);
                setTotalCount(catalogue.totalCount);
            },
            disableRefresh
        );
    }

    function onAddToCart(event) {
        event.preventDefault();

        if (disableAddToCart) {
            console.warn(
                'Not logged in! Cannot add to cart, will prompt user to login...'
            );
            navigate('/login');
        } else {
            const catalogueEntryId = event.target.id;
            console.log('Adding item to cart', catalogueEntryId);
        }
    }

    return {
        catalogue: catalogue,
        totalCount: totalCount,
        disableAddToCart: disableAddToCart,
        onAddToCart: onAddToCart,
        isLoading: isLoading,
        searchTerm: searchTerm,
        setSearchTerm: setSearchTerm
    };
}
