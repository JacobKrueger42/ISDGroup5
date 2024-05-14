import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

export default function EnhancedTableRow({
    row,
    index,
    onClick,
    isSelected,
    rowConfig
}) {
    const isItemSelected = isSelected(row.id);

    return (
        <TableRow
            hover
            onClick={event => onClick(event, row.id)}
            role='checkbox'
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            sx={{ cursor: 'pointer' }}
        >
            <TableCell padding='checkbox'>
                <Checkbox color='primary' checked={isItemSelected} />
            </TableCell>
            <TableCell
                component='th'
                id={`enhanced-table-checkbox-${index}`}
                scope='row'
                padding='none'
            >
                {row.uniqueProductCode}
            </TableCell>
            {rowConfig.map((config, index) => (
                <TableCell key={index}>{row[config.id]}</TableCell>
            ))}
        </TableRow>
    );
}
