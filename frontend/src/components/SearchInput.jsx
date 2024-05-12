import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

// search input allowing free text input but suggests options
// will group by category if it exists, else fallback to alphabetical order
export default function SearchInput({
    options,
    searchTerm,
    setSearchTerm,
    label
}) {
    const hasCategory =
        options?.length > 0 && Object.keys(options[0]).includes('category');

    const onChange = (event, newValue, reason) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Backspace' || event.key === 'Delete') &&
            reason === 'removeOption'
        ) {
            return;
        }
        setSearchTerm(newValue);
    };

    return (
        <Stack spacing={4} direction='row' alignItems='center'>
            <Autocomplete
                freeSolo
                value={searchTerm}
                onChange={onChange}
                options={options.map(option => option.name).sort()}
                groupBy={option =>
                    hasCategory ? option.category : option[0].toUpperCase()
                }
                sx={{ flexGrow: 1 }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label={label ?? 'Search input'}
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
