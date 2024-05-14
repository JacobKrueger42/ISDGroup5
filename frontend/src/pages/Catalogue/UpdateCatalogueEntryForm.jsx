import { Dropdown } from '#components';
import { titleCase } from '#utils';
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

export function UpdateCatalogueEntryForm({
    open,
    onClose,
    onSubmit,
    categoryOptions,
    existing,
    error,
    isLoading
}) {
    const [submissionDisabled, disasbledSubmission] = useState(true);
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

        onSubmit({
            ...formJson,
            category: selectedCategory ?? undefined
        });
    };

    useEffect(() => {
        setSelectedCategory(existing?.category ?? '');
        disasbledSubmission(isLoading || selectedCategory === '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, selectedCategory, existing]);

    return (
        existing && (
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: onSubmitWrapper
                }}
            >
                <DialogTitle>
                    Update catalogue entry | {titleCase(existing.name)} :{' '}
                    {existing.uniqueProductCode}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText margin='normal'>
                        Update this catalogue entry with a new category, stock
                        levels, and/or pricing
                    </DialogContentText>
                    <TextField
                        label='Product'
                        value={existing.name}
                        InputProps={{
                            readOnly: true
                        }}
                        fullWidth
                        type='text'
                        margin='normal'
                    />
                    <TextField
                        autoFocus
                        name='quantity'
                        label='Stock quantity (set the current stock level)'
                        value={existing.quantity}
                        fullWidth
                        required
                        type='number'
                        error={!!error}
                        margin='normal'
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    $
                                </InputAdornment>
                            )
                        }}
                        name='price'
                        label='Price (AUD$)'
                        value={existing.price}
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
                        variant='contained'
                        color='warning'
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        type='submit'
                        disabled={submissionDisabled}
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
        )
    );
}
