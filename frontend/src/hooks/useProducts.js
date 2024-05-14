import { useFetch, useServer } from '#hooks';
import { useEffect, useState } from 'react';

export default function useProducts() {
    const { isLoading, shouldRefresh, makeServerChange } = useServer();

    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { get, post, remove } = useFetch();

    useEffect(() => {
        (async () => {
            if (!products || products.length === 0) await LoadProductsAsync();
            if (shouldRefresh) {
                console.log('refreshing products...');
                await LoadProductsAsync();
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldRefresh, isLoading]);

    function LoadProductsAsync() {
        const disableRefresh = true;
        return makeServerChange(
            // client side pagination for simplicity
            async () => await get('product/list?take=50'),
            products => {
                console.log(`loaded ${products.totalCount} products`);
                setProducts(products.results);
                setTotalCount(products.totalCount);
            },
            disableRefresh
        );
    }

    async function createProductAsync({
        uniqueProductCode,
        name,
        brandName,
        description
    }) {
        const result = makeServerChange(
            async () =>
                await post('product/create', {
                    uniqueProductCode: uniqueProductCode,
                    name: name,
                    brandName: brandName,
                    description: description
                }),
            res => console.log(`created product with result: `, res)
        );

        return result;
    }

    async function updateProductAsync({
        id,
        name,
        brandName,
        description,
        catalogueId
    }) {
        const result = makeServerChange(
            async () =>
                await post(`product/${id}/update`, {
                    name: name,
                    brandName: brandName,
                    description: description,
                    catalogueId: catalogueId
                }),
            res => console.log('updated product with result: ', res)
        );

        return result;
    }

    async function removeProductAsync({ id }) {
        const result = makeServerChange(
            async () => await remove(`product/${id}/remove`),
            res => console.log('removed product with result: ', res)
        );

        return result;
    }

    return {
        createProductAsync,
        updateProductAsync,
        removeProductAsync,
        products,
        totalCount,
        isLoading
    };
}
