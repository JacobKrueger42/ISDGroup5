import { Dropdown } from '#components';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
    TextField
} from '@mui/material';
import { useEffect, useState } from 'react';

export function AddCatalogueEntryForm({
    open,
    onClose,
    onSubmit,
    existingCatalogue,
    products,
    categoryOptions,
    error,
    isLoading
}) {
    const [submissionDisabled, disasbledSubmission] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState('');

    const getSelectedProduct = selected =>
        products.find(p => p.name === selected);

    const filterProductOptions = products => {
        return products
            .filter(
                product =>
                    !existingCatalogue
                        .map(c => c.productId)
                        .includes(product.id)
            )
            .map(product => product.name);
    };

    const dropdownOptions = {
        id: 'productId',
        label: 'Product',
        value: selectedProduct,
        onChange: event => setSelectedProduct(event.target.value),
        placeholder: 'Choose a product'
    };

    const [selectedCategory, setSelectedCategory] = useState('');

    const categoryDropdownOptions = {
        id: 'categoryId',
        label: 'Category',
        value: selectedCategory,
        onChange: event => setSelectedCategory(event.target.value),
        placeholder: 'Choose a category'
    };

    const onSubmitWrapper = event => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const found = getSelectedProduct(selectedProduct);

        onSubmit({
            ...formJson,
            productId: found?.id ?? undefined,
            category: selectedCategory ?? undefined
        });
    };

    useEffect(() => {
        const found = getSelectedProduct(selectedProduct);

        // we cannot create a catalogue entry for an existing product
        const invalidProductSelected =
            (found?.id ?? undefined) &&
            existingCatalogue.map(c => c.productId).includes(found?.id);

        disasbledSubmission(
            isLoading ||
                invalidProductSelected ||
                selectedProduct === '' ||
                selectedCategory === ''
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProduct, selectedCategory, isLoading]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: onSubmitWrapper
            }}
        >
            <DialogTitle>Add a new catalogue entry</DialogTitle>
            <DialogContent>
                <DialogContentText margin='normal'>
                    Add a new catalogue entry with various details for an
                    existing product.
                    <br />
                    <strong>Note:</strong> only products without an existing
                    catalogue entry are available.
                </DialogContentText>
                <Dropdown
                    autoFocus
                    options={filterProductOptions(products)}
                    error={!!error}
                    {...dropdownOptions}
                />
                <TextField
                    name='quantity'
                    label='Stock quantity (set the current stock level)'
                    fullWidth
                    required
                    type='number'
                    error={!!error}
                    margin='normal'
                />
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>$</InputAdornment>
                        )
                    }}
                    name='price'
                    label='Price (AUD$)'
                    fullWidth
                    required
                    type='number'
                    error={!!error}
                    margin='normal'
                />
                <Dropdown
                    autoFocus
                    options={categoryOptions}
                    error={!!error}
                    {...categoryDropdownOptions}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={isLoading}
                    variant='contained'
                    color='warning'
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={submissionDisabled}
                    variant='contained'
                    type='submit'
                >
                    Submit
                </Button>
            </DialogActions>
            {error && (
                <Alert sx={{ margin: 4 }} severity='error'>
                    {error.message}
                </Alert>
            )}
        </Dialog>
    );
}
