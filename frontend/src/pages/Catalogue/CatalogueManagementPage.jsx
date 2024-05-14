import { EnhancedTable, Layout } from '#components';
import {
    useCatalogue,
    useEnhancedTable,
    useManageCatalogueEntries,
    useProducts
} from '#hooks';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CatalgoueEntryManagementHeader } from './CatalgoueEntryManagementHeader';
import { AddCatalogueEntryForm } from './AddCatalogueEntryForm';
import { UpdateCatalogueEntryForm } from './UpdateCatalogueEntryForm';
import { mapToRow } from './RowMapper';

const categoryOptions = [
    'TOOLS AND TEST EQUIPMENT',
    'SOUND AND VIDEO',
    'CABLES AND CONNECTORS',
    'COMPONENTS AND ELECTROMECHANICAL',
    'POWER AND BATTERIES',
    'HOBBIES AND GADGETS',
    '3D PRINTING',
    'SECURITY AND SURVEILLANCE',
    'COMPUTING AND COMMUNICATION',
    'KITS, SCIENCE AND LEARNING',
    'OUTDOORS AND AUTOMOTIVE'
];

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

    const tableProps = useEnhancedTable(catalogue.map(mapToRow));
    const { selected, searchTerm, setSearchTerm } = tableProps;

    const {
        error,
        openAddCatalogueEntry,
        setOpenAddCatalogueEntry,
        openUpdateCatalogueEntry,
        setOpenUpdateCatalogueEntry,
        onAddCatalogueEntrySubmitAsync,
        onCloseAddCatalogueEntry,
        onUpdateCatalogueEntrySubmitAsync,
        onCloseUpdateCatalogueEntry,
        getFirstOrDefaultSelectedCatalogueEntry,
        onDeleteCatalogueEntryAsync
    } = useManageCatalogueEntries({
        catalogue,
        removeCatalogueEntryAsync,
        createCatalogueEntryAsync,
        updateCatalogueEntryAsync,
        ...tableProps
    });

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

                    <AddCatalogueEntryForm
                        open={openAddCatalogueEntry}
                        onClose={onCloseAddCatalogueEntry}
                        onSubmit={onAddCatalogueEntrySubmitAsync}
                        products={products}
                        categoryOptions={categoryOptions}
                        isLoading={isLoading}
                        error={error}
                    />

                    <UpdateCatalogueEntryForm
                        open={openUpdateCatalogueEntry}
                        onClose={onCloseUpdateCatalogueEntry}
                        onSubmit={onUpdateCatalogueEntrySubmitAsync}
                        error={error}
                        isLoading={isLoading}
                        getExisting={getFirstOrDefaultSelectedCatalogueEntry}
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
