import {
    DefensiveMicrobotsUrl,
    HardlightAfterburnerUrl,
    HeadStompersUrl,
    LaserScopeUrl,
    Pocket_ICBMUrl,
    SpareDronePartsUrl
} from '#assets';
import { useAuth, useFetch, useServer } from '#hooks';
import FuzzySearch from 'fuzzy-search';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function mockProductUrlRoulette() {
    return mockProductUrls.sort(() => 0.5 - Math.random())[0];
}

const mockProductUrls = [
    LaserScopeUrl,
    DefensiveMicrobotsUrl,
    HeadStompersUrl,
    Pocket_ICBMUrl,
    HardlightAfterburnerUrl,
    SpareDronePartsUrl
];

export default function useCatalogue() {
    const navigate = useNavigate();
    const { user, isLoading: isLoadingUser } = useAuth();

    const [searcher, setSearcher] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);

    const {
        isLoading: isLoadingServer,
        shouldRefresh,
        makeServerChange
    } = useServer();

    const [catalogue, setCatalogue] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [visibleCatalogue, setVisibleCatalogue] = useState([]);
    const [disableAddToCart, setDisableAddToCart] = useState(true);

    const [isLoading, setLoading] = useState(true);

    const { get, post, remove } = useFetch();

    useEffect(() => {
        (async () => {
            // we should only allow users to add to a cart if they're logged in
            setDisableAddToCart(!user);

            // first page load
            if (!catalogue || catalogue.length === 0)
                await LoadCatalogueAsync();
            else await RefreshCatalogueAsync();
        })();

        setLoading(isLoadingServer && isLoadingUser);
        // we only care to refresh when we toggle these flags
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldRefresh, searchTerm, isLoadingServer, isLoadingUser]);

    async function RefreshCatalogueAsync() {
        if (shouldRefresh) {
            console.log('refreshing catalogue...');
            await LoadCatalogueAsync();
        } else if (searchTerm && searcher) {
            const filteredResults = searcher.search(escapeRegExp(searchTerm));
            console.log('search results: ', filteredResults);
            setVisibleCatalogue(filteredResults);
        } else {
            // reset to the original content without prompting a network call
            setVisibleCatalogue(catalogue);
        }
    }

    function LoadCatalogueAsync() {
        const disableRefresh = true;
        return makeServerChange(
            // client side pagination for simplicity
            async () => await get('catalogue/list?take=50'),
            catalogue => {
                console.log(`loaded ${catalogue.totalCount} catalogue entries`);

                const mapedDtos = catalogue.results.map(c => {
                    return { ...c, assetFn: mockProductUrlRoulette() };
                });

                setCatalogue(mapedDtos);

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
                setVisibleCatalogue(mapedDtos);
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

    function getCatalogueEntry(catalogueId) {
        if (catalogueId === null || catalogueId === undefined)
            throw new Error('no id provided to get catalogue entry');

        if (isLoading) return { name: 'loading...' };

        return catalogue.find(c => c.id === Number(catalogueId));
    }

    function removeCatalogueEntryAsync(catalogueId) {
        console.log('remove catalogue entry', catalogueId);

        if (!catalogueId)
            throw new Error('cannot remove a catalogue entry without its ID');

        return makeServerChange(
            async () => await remove(`catalogue/${catalogueId}/remove`),
            res => console.log(`remove catalogue entry with result: `, res)
        );
    }

    function createCatalogueEntryAsync({
        productId,
        price,
        category,
        quantity
    }) {
        return makeServerChange(
            async () =>
                await post('catalogue/create', {
                    productId: productId,
                    price: price,
                    productCategory: category,
                    stockQuantity: quantity
                }),
            res => console.log(`created catalogue entry with result: `, res)
        );
    }

    function updateCatalogueEntryAsync({
        catalogueId,
        quantity,
        price,
        category,
        isArchived
    }) {
        console.log('update catalogue entry entry', catalogueId);

        console.log('updated: ', {
            catalogueId,
            quantity,
            price,
            category,
            isArchived
        });
    }

    return {
        catalogue: visibleCatalogue,
        totalCount: totalCount,
        disableAddToCart: disableAddToCart,
        onAddToCart: onAddToCart,
        isLoading: isLoading,
        searchTerm: searchTerm,
        setSearchTerm: setSearchTerm,
        getCatalogueEntry: getCatalogueEntry,
        removeCatalogueEntryAsync: removeCatalogueEntryAsync,
        createCatalogueEntryAsync: createCatalogueEntryAsync,
        updateCatalogueEntryAsync: updateCatalogueEntryAsync
    };
}

////////////////////////////////v
// utilities
////////////////////////////////v

// dont let users input regex
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
