import { AppShell, EnhancedTableHead, EnhancedTableRow } from '#components';
import { useEnhancedTable } from '#hooks';

import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// demo header data
const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Dessert (100g serving)'
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories'
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Fat (g)'
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Carbs (g)'
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)'
    }
];

// demo data
const rows = [
    {
        id: 1,
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3
    },
    { id: 2, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
    {
        id: 3,
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 24,
        protein: 6.0
    },
    {
        id: 4,
        name: 'Frozen yoghurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0
    },
    {
        id: 5,
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9
    },
    {
        id: 6,
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5
    },
    {
        id: 7,
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3
    },
    {
        id: 8,
        name: 'Jelly Bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0
    },
    {
        id: 9,
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7.0
    },
    {
        id: 10,
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0.0
    },
    {
        id: 11,
        name: 'Marshmallow',
        calories: 318,
        fat: 0,
        carbs: 81,
        protein: 2.0
    },
    {
        id: 12,
        name: 'Nougat',
        calories: 360,
        fat: 19.0,
        carbs: 9,
        protein: 37.0
    },
    { id: 13, name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0 }
];

export default function ProductsPage() {
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
        handleClick,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSelectAllClick
    } = useEnhancedTable(headCells, rows);

    return (
        <AppShell>
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
                </CardContent>

                {/* TODO: move this to the table head */}
                <CardActions>
                    <Button
                        variant='contained'
                        onClick={e => console.log('create new product', e)}
                    >
                        Add
                    </Button>

                    <Button
                        variant='contained'
                        onClick={e => console.log('updating products', e)}
                    >
                        Update
                    </Button>

                    <Button
                        variant='contained'
                        color='error'
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
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                return (
                                    <EnhancedTableRow
                                        row={row}
                                        index={index}
                                        key={index}
                                        handleClick={handleClick}
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
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </AppShell>
    );
}
