import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

// currently bugged and sorts in reverse idky
// search input allowing free text input but suggests options
// will group by category if it exists, else fallback to alphabetical order
export default function SearchInput({ options }) {
    const hasCategory =
        options?.length > 0 && Object.keys(options[0]).includes('category');

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
                groupBy={option =>
                    hasCategory ? option.category : option[0].toUpperCase()
                }
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
