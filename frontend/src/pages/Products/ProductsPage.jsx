import { EnhancedTable, Layout } from '#components';
import { useEnhancedTable, useManageProducts, useProducts } from '#hooks';
import { Button } from '@mui/material';
import AddProductForm from './AddProduct';
import { ProductManagementHeader } from './ProductManagementHeader';
import { mapToRow } from './RowMapper';
import UpdateProduct from './UpdateProduct';

export default function ProductsPage() {
    const {
        products,
        totalCount,
        createProductAsync,
        updateProductAsync,
        removeProductAsync,
        isLoading
    } = useProducts();

    const tableProps = useEnhancedTable({ rows: products.map(mapToRow) });
    const { selected, searchTerm, setSearchTerm } = tableProps;

    const {
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
    } = useManageProducts({
        products,
        selected,
        createProductAsync,
        updateProductAsync,
        removeProductAsync,
        ...tableProps
    });

    return (
        <Layout
            title='Inventory Management - Products'
            headerContent={
                <ProductManagementHeader
                    products={products}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isLoading={isLoading}
                />
            }
            headerActions={
                <>
                    <Button
                        variant='contained'
                        onClick={() => setOpenAddProduct(true)}
                    >
                        Add
                    </Button>

                    <Button
                        variant='contained'
                        disabled={selected.length !== 1}
                        onClick={() => setOpenUpdateProduct(true)}
                    >
                        Update
                    </Button>

                    <Button
                        variant='contained'
                        color='error'
                        disabled={selected.length !== 1}
                        onClick={onDeleteProductAsync}
                    >
                        Delete
                    </Button>

                    <AddProductForm
                        open={openAddProduct}
                        onClose={onCloseAddProduct}
                        onSubmit={onAddProductSubmitAsync}
                        isLoading={isLoading}
                        error={error}
                    />

                    <UpdateProduct
                        open={openUpdateProduct}
                        onClose={onCloseUpdateProduct}
                        onSubmit={onUpdateProductSubmitAsync}
                        error={error}
                        isLoading={isLoading}
                        getExisting={getFirstOrDefaultSelectedProduct}
                    />
                </>
            }
        >
            <EnhancedTable
                headCells={headCells}
                totalCount={totalCount}
                isLoading={isLoading}
                {...tableProps}
            />
        </Layout>
    );
}

const headCells = [
    {
        id: 'uniqueProductCode',
        label: 'UPC'
    },
    {
        id: 'name',
        label: 'Product'
    },
    {
        id: 'brandName',
        label: 'Brand Name'
    }
];
