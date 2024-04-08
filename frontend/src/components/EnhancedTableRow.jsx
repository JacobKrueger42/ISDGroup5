import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

export default function EnhancedTableRow({
    row,
    index,
    handleClick,
    isSelected
}) {
    const isItemSelected = isSelected(row.id);

    return (
        <TableRow
            hover
            onClick={event => handleClick(event, row.id)}
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
                {row.name}
            </TableCell>
            <TableCell align='right'>{row.calories}</TableCell>
            <TableCell align='right'>{row.fat}</TableCell>
            <TableCell align='right'>{row.carbs}</TableCell>
            <TableCell align='right'>{row.protein}</TableCell>
        </TableRow>
    );
}
