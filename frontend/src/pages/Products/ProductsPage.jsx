import { EnhancedTableHead, EnhancedTableRow } from '#components';
import { useEnhancedTable, useProducts } from '#hooks';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { useState } from 'react';

import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import AddProductForm from './AddProduct';
import UpdateProduct from './UpdateProduct';

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
    const {
        products,
        totalCount,
        createProductAsync,
        updateProductAsync,
        error
    } = useProducts();

    console.log('products', products);

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
        handleSelectAllClick
    } = useEnhancedTable(products.map(mapToRow));

    //////////////////
    // Create product
    //////////////////

    const [openAddProduct, setOpenAddProduct] = useState(false);

    const onAddProductSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const res = await createProductAsync(formJson);
        console.log('response', res);
        if (error === null) setOpenAddProduct(false);
    };

    //////////////////
    // Update product
    //////////////////

    const [openUpdateProduct, setOpenUpdateProduct] = useState(false);

    const getFirstOrDefaultSelectedProduct = () =>
        products.find(p => p.id === selected[0]);

    const onUpdateProductSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const res = await updateProductAsync({ id: selected[0], ...formJson });
        console.log('response', res);
        if (error === null) setOpenAddProduct(false);
    };

    return (
        <>
            <Card variant='outlined'>
                <CardHeader title='Inventory Management - Products' />
                <CardContent>
                    <Typography
                        align='left'
                        variant='body'
                        color='text.secondary'
                    >
                        Here you can manage products tracked by the system.
                        Products listed here can be added to the public product
                        catalogue.
                    </Typography>

                    <AddProductForm
                        open={openAddProduct}
                        onClose={() => setOpenAddProduct(false)}
                        onSubmit={onAddProductSubmit}
                        error={error}
                    />

                    <UpdateProduct
                        open={openUpdateProduct}
                        onClose={() => setOpenUpdateProduct(false)}
                        onSubmit={onUpdateProductSubmit}
                        error={error}
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
                        onClick={() => {
                            console.log(selected);
                            setOpenUpdateProduct(true);
                        }}
                    >
                        Update
                    </Button>

                    <Button
                        variant='contained'
                        color='error'
                        disabled={selected.length !== 1}
                        onClick={e => console.log('deleting product', e)}
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
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
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
