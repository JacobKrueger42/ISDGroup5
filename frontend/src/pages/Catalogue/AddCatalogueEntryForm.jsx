import { Dropdown } from '#components';
import { useState } from 'react';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    InputAdornment
} from '@mui/material';

export function AddCatalogueEntryForm({
    open,
    onClose,
    onSubmit,
    products,
    categoryOptions,
    error,
    isLoading
}) {
    const [selectedProduct, setSelectedProduct] = useState('');

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
        const found = products.find(p => p.name === selectedProduct);

        onSubmit({
            ...formJson,
            productId: found?.id ?? undefined,
            category: selectedCategory ?? undefined
        });
    };

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
                    Add a new catalogue entry with various details. Be sure to
                    use a unique{' '}
                    <a href='https://en.wikipedia.org/wiki/Universal_Product_Code'>
                        UPC
                    </a>{' '}
                    to identify it.
                </DialogContentText>
                <Dropdown
                    autoFocus
                    options={products.map(p => p.name)}
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
                <Button disabled={isLoading} variant='contained' type='submit'>
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
