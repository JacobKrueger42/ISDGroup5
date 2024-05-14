import { TableCell, TableRow } from '@mui/material';

export default function EmptyRowPlaceholder({ count }) {
    return (
        <TableRow
            style={{
                height: 53 * count
            }}
        >
            <TableCell colSpan={6} />
        </TableRow>
    );
}
