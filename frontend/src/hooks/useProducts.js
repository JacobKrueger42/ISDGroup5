import { useState, useEffect } from 'react';
import { useFetch, useServer } from '#hooks';

export default function useProducts() {
    const { isLoading, shouldRefresh, makeServerChange } = useServer();

    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { get, post } = useFetch();

    useEffect(() => {
        (async () => {
            const disableRefresh = true;
            makeServerChange(
                async () => await get('product/list'),
                products => {
                    console.log(`loaded ${products.totalCount} products`);
                    setProducts(products.results);
                    setTotalCount(products.totalCount);
                },
                disableRefresh
            );
        })();
    }, [shouldRefresh]);

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

    return {
        createProductAsync,
        updateProductAsync,
        products,
        totalCount,
        isLoading
    };
}
