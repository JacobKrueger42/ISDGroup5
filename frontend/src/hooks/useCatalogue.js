import { useFetch, useServer, useAuth } from '#hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FuzzySearch from 'fuzzy-search';

export default function useCatalogue() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [searcher, setSearcher] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);

    const { isLoading, shouldRefresh, makeServerChange } = useServer();

    const [catalogue, setCatalogue] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [visibleCatalogue, setVisibleCatalogue] = useState([]);
    const [disableAddToCart, setDisableAddToCart] = useState(true);

    const { get } = useFetch();

    useEffect(() => {
        function LoadCatalogueAsync() {
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

                    // initialise a new searcher instance as the dependencies have changed
                    setSearcher(
                        new FuzzySearch(
                            catalogue.results,
                            ['name', 'uniqueProductCode'],
                            {
                                caseSensitive: true
                            }
                        )
                    );

                    // same as the catalogue until we have a search term
                    setVisibleCatalogue(catalogue.results);
                },
                disableRefresh
            );
        }

        (async () => {
            // we should only allow users to add to a cart if they're logged in
            setDisableAddToCart(!user);

            // first page load
            if (!catalogue) {
                LoadCatalogueAsync();
                return;
            }

            if (searchTerm && searcher) {
                const filteredResults = searcher.search(
                    escapeRegExp(searchTerm)
                );
                console.log('search results: ', filteredResults);
                setVisibleCatalogue(filteredResults);
            } else {
                // reset to the original content without prompting a network call
                setVisibleCatalogue(catalogue);
            }
        })();

        // we only care to refresh when we toggle either of these flags
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldRefresh, searchTerm]);

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
        catalogue: visibleCatalogue,
        totalCount: totalCount,
        disableAddToCart: disableAddToCart,
        onAddToCart: onAddToCart,
        isLoading: isLoading,
        searchTerm: searchTerm,
        setSearchTerm: setSearchTerm
    };
}

////////////////////////////////v
// utilities
////////////////////////////////v

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
