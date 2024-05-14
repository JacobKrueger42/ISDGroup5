import { useState } from 'react';

export default function useManageProducts({
    products,
    selected,
    createProductAsync,
    updateProductAsync,
    removeProductAsync,
    clearSelection
}) {
    const [error, setError] = useState(null);

    //////////////////
    // Create product
    //////////////////

    const [openAddProduct, setOpenAddProduct] = useState(false);

    const onAddProductSubmitAsync = async event => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const { success, error } = await createProductAsync(formJson);

        if (success) onCloseAddProduct();
        else setError(error);
    };

    const onCloseAddProduct = () => {
        setOpenAddProduct(false);
        setError(null);
    };

    //////////////////
    // Update product
    //////////////////

    const [openUpdateProduct, setOpenUpdateProduct] = useState(false);

    const getFirstOrDefaultSelectedProduct = () =>
        products.find(p => p.id === selected[0]);

    const onUpdateProductSubmitAsync = async event => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const success = await updateProductAsync({
            id: selected[0],
            ...formJson
        });

        if (success) onCloseUpdateProduct();
        else setError(error);
    };

    const onCloseUpdateProduct = () => {
        setOpenUpdateProduct(false);
        setError(null);
    };

    //////////////////
    // Delete product
    //////////////////

    const onDeleteProductAsync = async event => {
        event.preventDefault();
        const existing = getFirstOrDefaultSelectedProduct();
        await removeProductAsync({ id: existing.id });
        clearSelection();
    };

    return {
        error,
        openAddProduct,
        setOpenAddProduct,
        openUpdateProduct,
        setOpenUpdateProduct,
        onAddProductSubmitAsync,
        onCloseAddProduct,
        onUpdateProductSubmitAsync,
        onCloseUpdateProduct,
        getFirstOrDefaultSelectedProduct,
        onDeleteProductAsync
    };
}
