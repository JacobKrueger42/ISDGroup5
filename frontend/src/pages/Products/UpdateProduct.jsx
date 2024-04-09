import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function UpdateProduct({
    open,
    onClose,
    onSubmit,
    getExisting,
    error
}) {
    const existing = getExisting();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: onSubmit
            }}
        >
            <DialogTitle>Update product | {existing?.name ?? ''}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    name='uniqueProductCode'
                    label='UPC (Unique Product Code)'
                    fullWidth
                    required
                    type='number'
                    error={!!error}
                    margin='normal'
                />
                <TextField
                    autoFocus
                    name='name'
                    label='Name'
                    fullWidth
                    required
                    type='text'
                    error={!!error}
                    margin='normal'
                />
                <TextField
                    autoFocus
                    name='brandName'
                    label='Brand Name'
                    fullWidth
                    required
                    type='text'
                    error={!!error}
                    margin='normal'
                />
                <TextField
                    autoFocus
                    name='description'
                    label='Description'
                    fullWidth
                    type='text'
                    margin='normal'
                    multiline
                    minRows='4'
                    maxRows='8'
                />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='warning' onClick={onClose}>
                    Cancel
                </Button>
                <Button variant='contained' type='submit'>
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
