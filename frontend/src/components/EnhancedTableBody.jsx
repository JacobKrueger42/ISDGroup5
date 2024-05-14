import { EnhancedTableRow, EmptyRowPlaceholder } from '#components';
import { TableBody } from '@mui/material';

export default function EnhancedTableBody({
    visibleRows,
    emptyRows,
    onRowClick,
    isSelected,
    rowConfig
}) {
    return (
        <TableBody>
            {visibleRows.map((row, index) => {
                return (
                    <EnhancedTableRow
                        row={row}
                        index={index}
                        key={index}
                        onClick={onRowClick}
                        isSelected={isSelected}
                        rowConfig={rowConfig}
                    />
                );
            })}
            {emptyRows > 0 && <EmptyRowPlaceholder count={emptyRows} />}
        </TableBody>
    );
}
