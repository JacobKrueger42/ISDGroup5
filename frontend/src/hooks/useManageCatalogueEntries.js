import { useState } from 'react';

export default function useManageCatalogueEntries({
    catalogue,
    selected,
    createCatalogueEntryAsync,
    updateCatalogueEntryAsync,
    removeCatalogueEntryAsync,
    clearSelection
}) {
    const [error, setError] = useState(null);

    function openAddCatalogueEntry() {}

    function setOpenAddCatalogueEntry() {}

    function openUpdateCatalogueEntry() {}

    function setOpenUpdateCatalogueEntry() {}

    function onAddCatalogueEntrySubmitAsync() {}

    function onCloseAddCatalogueEntry() {}

    function onUpdateCatalogueEntrySubmitAsync() {}

    function onCloseUpdateCatalogueEntry() {}

    function getFirstOrDefaultSelectedCatalogueEntry() {}

    function onDeleteCatalogueEntryAsync() {}

    return {
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
    };
}
