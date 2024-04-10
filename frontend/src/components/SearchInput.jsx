import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

// search input allowing free text input but suggests options
export default function SearchInput({ options }) {
    return (
        <Stack spacing={4} direction='row' alignItems='center'>
            <Typography align='left' variant='body' color='text.secondary'>
                or find somethign specific
            </Typography>

            <Autocomplete
                freeSolo
                id='free-solo-2-demo'
                disableClearable
                options={options.map(option => option.name)}
                sx={{ flexGrow: 1 }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label='Search input'
                        InputProps={{
                            ...params.InputProps,
                            type: 'search'
                        }}
                    />
                )}
            />
        </Stack>
    );
}
