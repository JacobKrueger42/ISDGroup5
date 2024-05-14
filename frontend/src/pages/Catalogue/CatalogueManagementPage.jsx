import {
    EnhancedTableHead,
    EnhancedTableRow,
    EmptyRowPlaceholder,
    Layout
} from '#components';
import {
    useCatalogue,
    useEnhancedTable,
    useManageCatalogueEntries,
    useProducts
} from '#hooks';
import {
    Button,
    Card,
    Table,
    TableBody,
    TableContainer,
    TablePagination
} from '@mui/material';
import { useEffect, useState } from 'react';
import { CatalgoueEntryManagementHeader } from './CatalgoueEntryManagementHeader';
import { mapToRow } from './RowMapper';

export default function CatalogueManagementPage() {
    // aggregate loading flags
    const [isLoading, setLoading] = useState(true);

    const {
        catalogue,
        totalCount,
        removeCatalogueEntryAsync,
        createCatalogueEntryAsync,
        updateCatalogueEntryAsync,
        isLoading: isLoadingCatalogue
    } = useCatalogue();

    const { products, isLoading: isLoadingProducts } = useProducts();

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
    } = useEnhancedTable(catalogue.map(mapToRow));

    const {
        // error,
        // openAddCatalogueEntry,
        setOpenAddCatalogueEntry,
        // openUpdateCatalogueEntry,
        setOpenUpdateCatalogueEntry,
        // onAddCatalogueEntrySubmitAsync,
        // onCloseAddCatalogueEntry,
        // onUpdateCatalogueEntrySubmitAsync,
        // onCloseUpdateCatalogueEntry,
        // getFirstOrDefaultSelectedCatalogueEntry,
        onDeleteCatalogueEntryAsync
    } = useManageCatalogueEntries(
        catalogue,
        selected,
        removeCatalogueEntryAsync,
        createCatalogueEntryAsync,
        updateCatalogueEntryAsync,
        clearSelection
    );

    useEffect(() => {
        setLoading(isLoadingCatalogue && isLoadingProducts);
    }, [isLoadingCatalogue, isLoadingProducts]);

    return (
        <Layout
            title='Inventory Management - Catalogue'
            headerContent={
                <CatalgoueEntryManagementHeader
                    catalogue={catalogue}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isLoading={isLoading}
                />
            }
            headerActions={
                <>
                    <Button
                        variant='contained'
                        onClick={() => setOpenAddCatalogueEntry(true)}
                    >
                        Add
                    </Button>

                    <Button
                        variant='contained'
                        disabled={selected.length !== 1}
                        onClick={() => setOpenUpdateCatalogueEntry(true)}
                    >
                        Update
                    </Button>

                    <Button
                        variant='contained'
                        color='error'
                        disabled={selected.length !== 1}
                        onClick={onDeleteCatalogueEntryAsync}
                    >
                        Delete
                    </Button>

                    {/* <AddCatalogueEntryForm
                        open={openAddCatalogueEntry}
                        onClose={onCloseAddCatalogueEntry}
                        onSubmit={onAddCatalogueEntrySubmitAsync}
                        isLoading={isLoading}
                        error={error}
                    />

                    <UpdateCatalogueEntry
                        open={openUpdateCatalogueEntry}
                        onClose={onCloseUpdateCatalogueEntry}
                        onSubmit={onUpdateCatalogueEntrySubmitAsync}
                        error={error}
                        isLoading={isLoading}
                        getExisting={getFirstOrDefaultSelectedCatalogueEntry}
                    /> */}
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
                                <EmptyRowPlaceholder count={emptyRows} />
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
        label: 'Product Name'
    },
    {
        id: 'price',
        label: 'Price'
    },
    {
        id: 'quantity',
        label: 'Stock Level'
    },
    {
        id: 'category',
        label: 'Catgory'
    }
];
