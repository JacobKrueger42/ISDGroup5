import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

// search input allowing free text input but suggests options
// will group by category if it exists, else fallback to alphabetical order
export default function SearchInput({
    options,
    searchTerm,
    setSearchTerm,
    label
}) {
    const [clicked, setClicked] = useState(false);

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
        <Stack
            spacing={4}
            direction='row'
            alignItems='center'
            border={clicked ? '1px solid transparent' : '1px solid gray'}
            borderRadius={4}
        >
            <IconButton>
                <SearchIcon />
            </IconButton>
            <Autocomplete
                freeSolo
                onOpen={() => setClicked(!clicked)}
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
