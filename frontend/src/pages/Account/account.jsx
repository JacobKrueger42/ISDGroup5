import { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { useAuth } from '#hooks';
import UpdateAccount from './UpdateAccount';

export default function AccountPage() {
    const {
        user,
        error,
        updateUserAsync,
        getUserAsync,
        setUser,
        removeUserAsync
    } = useAuth();

    const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

    const onCloseUpdateProduct = () => {
        setOpenUpdateProduct(false);
    };

    const handleUpdateButtonClick = () => {
        setOpenUpdateProduct(true);
    };

    const onCloseDeleteConfirmation = () => {
        setOpenDeleteConfirmation(false);
    };

    const handleDeleteButtonClick = () => {
        setOpenDeleteConfirmation(true);
    };

    // Delete
    const handleDeleteConfirm = async () => {
        await removeUserAsync(user.id);
        console.log('Deleted the user id');
    };
    // Update
    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const success = await updateUserAsync({
            id: user.id,
            ...formJson
        });

        if (success) {
            onCloseUpdateProduct();
            const user = await getUserAsync();
            setUser(user);
        }
    };

    if (user) {
        return (
            <>
                <Card
                    sx={{
                        textAlign: 'left',
                        maxWidth: '550px'
                    }}
                >
                    <CardContent
                        sx={{
                            textAlign: 'left',
                            marginBottom: '10px'
                        }}
                    >
                        <Typography variant='h5' gutterBottom>
                            Account Information
                        </Typography>
                        <TextField
                            label='First Name'
                            value={user.firstName}
                            fullWidth
                            margin='normal'
                            disabled
                        />
                        <TextField
                            label='Last Name'
                            value={user.lastName}
                            fullWidth
                            margin='normal'
                            disabled
                        />
                        <TextField
                            label='Email'
                            value={user.email}
                            fullWidth
                            margin='normal'
                            disabled
                        />
                        <TextField
                            label='Phone Number'
                            value={user.phone}
                            fullWidth
                            margin='normal'
                            disabled
                        />
                    </CardContent>
                    <CardContent>
                        <Button
                            sx={{
                                marginRight: '10px'
                            }}
                            variant='contained'
                            color='primary'
                            onClick={handleUpdateButtonClick}
                        >
                            Update Information
                        </Button>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={handleDeleteButtonClick}
                        >
                            Delete Account
                        </Button>
                    </CardContent>
                </Card>

                <UpdateAccount
                    open={openUpdateProduct}
                    onClose={onCloseUpdateProduct}
                    error={error}
                    user={user}
                    onSubmit={handleSubmit}
                />
                <Dialog
                    open={openDeleteConfirmation}
                    onClose={onCloseDeleteConfirmation}
                >
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete your account?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCloseDeleteConfirmation}>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={handleDeleteConfirm}
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}
