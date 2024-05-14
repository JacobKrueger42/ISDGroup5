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

    async function onAddCatalogueEntrySubmitAsync(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        const success = true;
        // const { success, error } = await createCatalogueEntryAsync(formJson);

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

    async function onUpdateCatalogueEntrySubmitAsync(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const success = await updateCatalogueEntryAsync({
            id: selected[0],
            ...formJson
        });

        if (success) onCloseUpdateCatalogueEntry();
        else setError(error);
    }

    ////////////////////////////////////
    // Delete catalogue entry
    ////////////////////////////////////

    async function onDeleteCatalogueEntryAsync(event) {
        event.preventDefault();
        const existing = getFirstOrDefaultSelectedCatalogueEntry();
        await removeCatalogueEntryAsync({ id: existing.id });
        clearSelection();
    }

    ////////////////////////////////////
    // Helpers
    ////////////////////////////////////

    const getFirstOrDefaultSelectedCatalogueEntry = () =>
        catalogue.find(p => p.id === selected[0]);

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
