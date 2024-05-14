import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';

import { titleCase } from '#utils';

export function UpdateCatalogueEntryForm({
    open,
    onClose,
    onSubmit,
    getExisting,
    error,
    isLoading
}) {
    const existing = getExisting();

    return (
        existing && (
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: onSubmit
                }}
            >
                <DialogTitle>
                    Update catalogue entry | {titleCase(existing.name)} :{' '}
                    {existing.uniqueProductCode}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        name='name'
                        label='Name'
                        defaultValue={titleCase(existing.name)}
                        fullWidth
                        required
                        type='text'
                        error={!!error}
                        margin='normal'
                    />
                    <TextField
                        name='brandName'
                        label='Brand Name'
                        defaultValue={titleCase(existing.brandName)}
                        fullWidth
                        required
                        type='text'
                        error={!!error}
                        margin='normal'
                    />
                    <TextField
                        name='description'
                        defaultValue={existing.description}
                        fullWidth
                        type='text'
                        margin='normal'
                        multiline
                        minRows='4'
                        maxRows='8'
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
                        disabled={isLoading}
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
