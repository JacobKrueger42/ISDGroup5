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
    TextField
} from '@mui/material';

export function AddCatalogueEntryForm({
    open,
    onClose,
    onSubmit,
    productOptions,
    error,
    isLoading
}) {
    // provide a placeholder
    const [selectedProduct, setSelectedProduct] = useState('');

    const dropdownOptions = {
        id: 'productId',
        label: 'Product',
        value: selectedProduct,
        onChange: event => setSelectedProduct(event.target.value),
        placeholder: 'Choose a product'
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: onSubmit
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
                <TextField
                    autoFocus
                    name='uniqueProductCode'
                    label='UPC (Unique Product Code)'
                    fullWidth
                    required
                    type='text'
                    error={!!error}
                    margin='normal'
                />
                <TextField
                    name='name'
                    label='Name'
                    fullWidth
                    required
                    type='text'
                    error={!!error}
                    margin='normal'
                />
                <TextField
                    name='brandName'
                    label='Brand Name'
                    fullWidth
                    required
                    type='text'
                    error={!!error}
                    margin='normal'
                />
                <TextField
                    name='description'
                    label='Description'
                    fullWidth
                    type='text'
                    margin='normal'
                    multiline
                    minRows='4'
                    maxRows='8'
                />
                <Dropdown
                    options={productOptions}
                    error={!!error}
                    {...dropdownOptions}
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
