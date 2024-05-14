import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function Dropdown({ options, error, ...dropDownProps }) {
    return (
        <FormControl fullWidth required error={!!error} margin='normal'>
            <InputLabel id={dropDownProps.id}>{dropDownProps.label}</InputLabel>
            <Select displayEmpty {...dropDownProps}>
                {options &&
                    options.map((option, index) => (
                        <MenuItem value={option} key={index}>
                            {option}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}
