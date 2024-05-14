import { useState, useMemo } from 'react';

export default function useEnhancedTable({ rows }) {
    // ordering
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    // selection
    const [selected, setSelected] = useState([]);

    // pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // search
    const [searchTerm, setSearchTerm] = useState(null);

    const visibleRows = useMemo(() => {
        return rows
            .filter(row => (!searchTerm ? row : row.name === searchTerm))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .sort(getComparator(order, orderBy));

        // including rows in the deps array is a little hacky as we negate
        // the memo almost anytime we touch a row object
    }, [order, orderBy, page, rowsPerPage, rows, searchTerm]);

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

    const onSelectAllClick = () => {
        if (selected.length > 0) clearSelection();
        else setSelected(rows.map(n => n.id));
    };

    const clearSelection = () => {
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
        onPageChange: handleChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
        onSelectAllClick,
        clearSelection,
        // search interaction
        searchTerm,
        setSearchTerm
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
