import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function AddProductForm({ open, onClose, onSubmit, error }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: onSubmit
            }}
        >
            <DialogTitle>Add a new product</DialogTitle>
            <DialogContent>
                <DialogContentText margin='normal'>
                    Add a new product with various details. Be sure to use a
                    unique{' '}
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
