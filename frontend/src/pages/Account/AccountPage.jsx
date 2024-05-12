import { useAuth } from '#hooks';
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from '@mui/material';
import { Layout } from '#components';
import { useState } from 'react';
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

    const [openUpdateAccount, setOpenUpdateAccount] = useState(false);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

    const onCloseUpdateAccount = () => {
        setOpenUpdateAccount(false);
    };

    const handleUpdateButtonClick = () => {
        setOpenUpdateAccount(true);
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
            onCloseUpdateAccount();
            const user = await getUserAsync();
            setUser(user);
        }
    };

    if (!user) return <></>;

    return (
        <Layout
            title='My Account'
            headerContent={
                <Typography variant='h5' gutterBottom>
                    Account Information
                </Typography>
            }
            headerActions={
                <>
                    <UpdateAccount
                        open={openUpdateAccount}
                        onClose={onCloseUpdateAccount}
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
                </>
            }
        >
            <Card>
                <CardContent>
                    <TextField
                        label='First Name'
                        value={user.firstName}
                        fullWidth
                        margin='normal'
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        label='Last Name'
                        value={user.lastName}
                        fullWidth
                        margin='normal'
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        label='Email'
                        value={user.email}
                        fullWidth
                        margin='normal'
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        label='Phone Number'
                        value={user.phone}
                        fullWidth
                        margin='normal'
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </CardContent>
            </Card>
        </Layout>
    );
}
