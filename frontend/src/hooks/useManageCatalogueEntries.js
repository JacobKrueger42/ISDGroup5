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

    ////////////////////////////////////
    // Create catalogue entry
    ////////////////////////////////////

    const [openAddCatalogueEntry, setOpenAddCatalogueEntry] = useState(false);

    function onCloseAddCatalogueEntry() {
        setOpenAddCatalogueEntry(false);
        setError(null);
    }

    async function onAddCatalogueEntrySubmitAsync(formData) {
        const { success, error } = await createCatalogueEntryAsync(formData);

        if (success) onCloseAddCatalogueEntry();
        else setError(error);
    }

    ////////////////////////////////////
    // Update catalogue entry
    ////////////////////////////////////

    const [openUpdateCatalogueEntry, setOpenUpdateCatalogueEntry] =
        useState(false);

    function onCloseUpdateCatalogueEntry() {
        setOpenUpdateCatalogueEntry(false);
        setError(null);
    }

    async function onUpdateCatalogueEntrySubmitAsync(formData) {
        const { success, error } = await updateCatalogueEntryAsync(formData);

        if (success) onCloseUpdateCatalogueEntry();
        else setError(error);
    }

    ////////////////////////////////////
    // Delete catalogue entry
    ////////////////////////////////////

    async function onDeleteCatalogueEntryAsync(event) {
        event.preventDefault();
        const existing = getFirstOrDefaultSelectedCatalogueEntry();
        await removeCatalogueEntryAsync(existing.id);
        clearSelection();
    }

    ////////////////////////////////////
    // Helpers
    ////////////////////////////////////

    const getFirstOrDefaultSelectedCatalogueEntry = () =>
        catalogue.find(c => c.id === selected[0]);

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
