import { EnhancedTableBody, EnhancedTableHead } from '#components';
import {
    Card,
    Skeleton,
    Table,
    TableContainer,
    TablePagination
} from '@mui/material';

const rowsPerPageOption = [5, 10, 25];

export default function EnhancedTable({
    headCells,
    totalCount,
    isLoading,
    ...tableProps
}) {
    const { orderBy } = tableProps;

    if (isLoading)
        return <Skeleton animation='wave' variant='rectangular' height={600} />;

    return (
        <Card>
            <TableContainer>
                <Table sx={{ minWidth: 750 }} size='medium'>
                    <EnhancedTableHead
                        orderBy={orderBy}
                        headCells={headCells}
                        {...tableProps}
                    />
                    <EnhancedTableBody {...tableProps} />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOption}
                count={totalCount}
                component='div'
                page={tableProps.page}
                rowsPerPage={tableProps.rowsPerPage}
                onPageChange={tableProps.onPageChange}
                onRowsPerPageChange={tableProps.onRowsPerPageChange}
            />
        </Card>
    );
}
