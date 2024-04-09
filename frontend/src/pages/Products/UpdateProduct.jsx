import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { titleCase } from '#utils';

export default function UpdateProduct({
    open,
    onClose,
    onSubmit,
    getExisting,
    error
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
                    Update product | {titleCase(existing.name)} :{' '}
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
                    >
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
        )
    );
}
