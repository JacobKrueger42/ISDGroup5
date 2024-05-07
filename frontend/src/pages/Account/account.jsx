import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button
} from '@mui/material';
import { useAuth } from '#hooks';

export default function AccountPage() {
    const { user } = useAuth();

    if (user) {
        return (
            <>
                <Card
                    sx={{
                        textAlign: 'left',
                        minWidth: '550px'
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
                        <hr></hr>
                        <TextField
                            label='Last Name'
                            value={user.lastName}
                            fullWidth
                            margin='normal'
                            disabled
                        />
                        <hr></hr>
                        <TextField
                            label='Email'
                            value={user.email}
                            fullWidth
                            margin='normal'
                            disabled
                        />
                        <hr></hr>
                        <TextField
                            label='Phone Number'
                            defaultValue={user.phone}
                            fullWidth
                            margin='normal'
                            disabled
                        />
                    </CardContent>
                    <CardContent>
                        <Button
                            sx={{ marginRight: '10px' }}
                            variant='contained'
                            color='primary'
                        >
                            Update Information
                        </Button>
                        <Button variant='contained' color='error'>
                            Delete Account
                        </Button>
                    </CardContent>
                </Card>
            </>
        );
    }
}
