import { Select, MenuItem } from '@mui/material';

export default function Dropdown({ options, ...dropDownProps }) {
    return (
        <Select
            displayEmpty
            {...dropDownProps}
            renderValue={selected =>
                selected === '' ? dropDownProps.placeholder : selected
            }
        >
            <MenuItem disabled value=''>
                <em>{dropDownProps.placeholder ?? 'Placeholder'}</em>
            </MenuItem>

            {options &&
                options.map((option, index) => (
                    <MenuItem value={option} key={index}>
                        {option}
                    </MenuItem>
                ))}
        </Select>
    );
}
