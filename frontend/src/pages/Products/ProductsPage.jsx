import { EnhancedTableHead, EnhancedTableRow } from '#components';
import { useEnhancedTable, useProducts } from '#hooks';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import SearchInput from '../../components/SearchInput';
import AddProductForm from './AddProduct';
import UpdateProduct from './UpdateProduct';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

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

export default function ProductsPage() {
    const [error, setError] = useState(null);

    const {
        products,
        totalCount,
        createProductAsync,
        updateProductAsync,
        removeProductAsync,
        isLoading
    } = useProducts();

    const mapToRow = product => {
        return {
            id: product.id,
            name: product.name,
            brandName: product.brandName,
            uniqueProductCode: product.uniqueProductCode
        };
    };

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

    return (
        <>
            <Card variant='outlined'>
                <CardHeader title='Inventory Management - Products' />
                <CardContent>
                    <Stack spacing={2}>
                        <Typography
                            align='left'
                            variant='body'
                            color='text.secondary'
                        >
                            Here you can manage products tracked by the system.
                            Products listed here can be added to the public
                            product catalogue.
                        </Typography>
                        {isLoading ? (
                            <Skeleton>
                                <SearchInput options={[]} />
                            </Skeleton>
                        ) : (
                            <SearchInput
                                options={products}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                        )}
                    </Stack>

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
                </CardContent>

                <CardActions>
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
                </CardActions>
            </Card>

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
        </>
    );
}
