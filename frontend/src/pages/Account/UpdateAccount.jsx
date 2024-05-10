import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function UpdateAccount({
    open,
    onClose,
    user,
    error,
    onSubmit
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: onSubmit
            }}
        >
            <DialogTitle>Update Account</DialogTitle>
            <DialogContent>
                <TextField
                    name='firstName'
                    label='First Name'
                    defaultValue={user.firstName}
                    fullWidth
                    type='text'
                    error={!!error}
                    margin='normal'
                />
                <TextField
                    name='lastName'
                    label='Last Name'
                    defaultValue={user.lastName}
                    fullWidth
                    type='text'
                    error={!!error}
                    margin='normal'
                />
                <TextField
                    name='email'
                    label='Email'
                    defaultValue={user.email}
                    fullWidth
                    type='text'
                    error={!!error}
                    margin='normal'
                />
                <TextField
                    name='phone'
                    label='Phone'
                    defaultValue={user.phone}
                    fullWidth
                    type='text'
                    error={!!error}
                    margin='normal'
                />
                {error && (
                    <Alert sx={{ margin: 2 }} severity='error'>
                        {error.message}
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='warning' onClick={onClose}>
                    Cancel
                </Button>
                <Button variant='contained' color='primary' type='submit'>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
