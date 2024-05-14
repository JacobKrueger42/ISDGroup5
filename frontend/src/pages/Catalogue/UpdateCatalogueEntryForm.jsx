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
    TextField,
    Switch,
    FormControlLabel
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

    const [formData, setFormData] = useState({
        isArchived: false,
        price: 0,
        quantity: 0
    });

    const categoryDropdownOptions = {
        id: 'categoryId',
        label: 'Category',
        value: selectedCategory,
        onChange: event => setSelectedCategory(event.target.value)
    };

    const onUpdateForm = event => {
        // checkboxes are always different for shits and giggles
        if (event.target.name === 'isArchived') {
            setFormData({
                ...formData,
                [event.target.name]: event.target.checked
            });
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        }
    };

    const onSubmitWrapper = event => {
        event.preventDefault();

        onSubmit({
            catalogueId: existing.id,
            category: selectedCategory,
            ...formData
        });
    };

    useEffect(() => {
        setFormData({
            ...formData,
            isArchived: existing?.isArchived ?? false,
            price: existing?.price ?? 0,
            quantity: existing?.quantity ?? 0
        });
        setSelectedCategory(existing?.category ?? '');
        disasbledSubmission(isLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, existing]);

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
                    {formData.isArchived && (
                        <Alert sx={{ margin: 2 }} severity='warning'>
                            This catalogue entry will be archived (the product
                            will remain and must be removed separately)
                        </Alert>
                    )}
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
                        value={formData.quantity}
                        onChange={onUpdateForm}
                        disabled={formData.isArchived}
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
                        value={formData.price}
                        onChange={onUpdateForm}
                        disabled={formData.isArchived}
                        fullWidth
                        required
                        type='number'
                        error={!!error}
                        margin='normal'
                    />
                    <Dropdown
                        autoFocus
                        disabled={formData.isArchived}
                        options={categoryOptions}
                        error={!!error}
                        {...categoryDropdownOptions}
                    />

                    <FormControlLabel
                        name='isArchived'
                        checked={formData.isArchived}
                        onChange={onUpdateForm}
                        control={<Switch color='warning' />}
                        label='Archive'
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
