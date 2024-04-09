import { useState, useEffect } from 'react';
import { useFetch } from '#hooks';

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // TODO: support DELETE verb
    const { get, post } = useFetch();

    useEffect(() => {
        (async () => {
            const products = await getProductsAsync();
            setProducts(products.results);
            setTotalCount(products.totalCount);
        })();
    }, []);

    async function getProductsAsync() {
        try {
            setLoading(true);
            // TODO: pagination
            const products = await get('product/list');
            setLoading(false);
            return products;
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    async function createProductAsync({
        uniqueProductCode,
        name,
        brandName,
        description
    }) {
        console.info('creating new product');

        let res;
        try {
            setLoading(true);

            res = await post('product/create', {
                uniqueProductCode: uniqueProductCode,
                name: name,
                brandName: brandName,
                description: description
            });

            setError(null);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }

        return res;
    }

    async function updateProductAsync({ id, name, brandName, catalogueId }) {
        let res;
        try {
            setLoading(true);

            res = await post(`product/${id}/update`, {
                name: name,
                brandName: brandName,
                catalogueId: catalogueId
            });

            setError(null);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }

        return res;
    }

    return {
        createProductAsync,
        updateProductAsync,
        products,
        totalCount,
        error,
        isLoading
    };
}
