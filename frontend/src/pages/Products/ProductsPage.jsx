import { EnhancedTableHead, EnhancedTableRow, Layout } from '#components';
import { useEnhancedTable, useManageProducts, useProducts } from '#hooks';
import {
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow
} from '@mui/material';
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

    const {
        order,
        orderBy,
        selected,
        page,
        rowsPerPage,
        emptyRows,
        visibleRows,
        handleRequestSort,
        isSelected,
        onRowClick,
        handleChangePage,
        handleChangeRowsPerPage,
        onSelectAllClick,
        clearSelection,
        searchTerm,
        setSearchTerm
    } = useEnhancedTable(products.map(mapToRow));

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
    } = useManageProducts(
        products,
        selected,
        createProductAsync,
        updateProductAsync,
        removeProductAsync,
        clearSelection
    );

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
            <Card>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby='tableTitle'
                        size='medium'
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            selected={selected}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={onSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={totalCount}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                return (
                                    <EnhancedTableRow
                                        row={row}
                                        index={index}
                                        key={index}
                                        onClick={onRowClick}
                                        isSelected={isSelected}
                                    />
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
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
