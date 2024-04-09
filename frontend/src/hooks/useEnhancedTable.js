import { useState, useMemo } from 'react';

export default function useEnhancedTable(rows) {
    // ordering
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    // selection
    const [selected, setSelected] = useState([]);

    // pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const visibleRows = useMemo(() => {
        return rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .sort(getComparator(order, orderBy));
        // including rows in the deps array is a little hacky as we negate
        // the memo almost anytime we touch a row object
    }, [order, orderBy, page, rowsPerPage, rows]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onRowClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = id => selected.indexOf(id) !== -1;

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelected = rows.map(n => n.id);
            setSelected(newSelected);
            return;
        }

        setSelected([]);
    };

    return {
        // fields
        order,
        orderBy,
        selected,
        page,
        rowsPerPage,
        emptyRows,
        visibleRows,
        // methods
        handleRequestSort,
        isSelected,
        onRowClick,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSelectAllClick
    };
}

// helpers

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
