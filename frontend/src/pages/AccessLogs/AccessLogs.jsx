import { Layout } from '#components';
import { useAuth } from '#hooks';
import SearchIcon from '@mui/icons-material/Search';
import {
    Stack,
    Box,
    Button,
    Card,
    CardContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function AccessLogPage() {
    const { user, getLogsAsync } = useAuth();
    const [searchDate, setSearchDate] = useState('');
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [logs, setLogs] = useState([]);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    useEffect(() => {
        (async () => {
            const logs = await getLogsAsync(user.id);
            // add index to logs
            const logsWithIndex = logs.map((log, index) => ({
                ...log,
                index: index + 1
            }));
            setLogs(logsWithIndex);
        })();
        // only react to the user changing here
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [user]);

    const handleSearch = async () => {
        // only get the date part
        const formattedSearchDate = formatDate(searchDate).split(' ')[0];
        const filtered = logs.filter(log =>
            formatDate(log.loginDate).startsWith(formattedSearchDate)
        );
        setFilteredLogs(filtered);
        if (filtered.length === 0 && formattedSearchDate !== '') {
            setFilteredLogs([]);
            setIsSearchPerformed(true);
        } else {
            setIsSearchPerformed(false);
        }
    };

    return (
        <Layout
            title='My Access Logs'
            headerActions={
                <>
                    <Stack
                        spacing={4}
                        direction='row'
                        alignItems='center'
                        border='1px solid gray'
                        borderRadius={2}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label='Search by Date'
                                type='date'
                                value={searchDate}
                                onChange={e => setSearchDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    textAlign: 'left',
                                    minWidth: '500px',
                                    marginRight: '20px'
                                }}
                            />
                            <Button
                                startIcon={<SearchIcon />}
                                variant='text' // hack to avoid fixing border overlap
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </Box>
                    </Stack>
                    {isSearchPerformed && filteredLogs.length === 0 && (
                        <Typography variant='body2'>
                            No logs found for the selected date. Displaying all
                            logs.
                        </Typography>
                    )}
                </>
            }
        >
            <Card>
                <CardContent sx={{ textAlign: 'left' }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Access Log</TableCell>
                                    <TableCell>Login Date/Time</TableCell>
                                    <TableCell>Logout Date/Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(filteredLogs.length > 0
                                    ? filteredLogs
                                    : logs
                                ).map(log => (
                                    <TableRow key={log.index}>
                                        <TableCell>{log.index}</TableCell>
                                        <TableCell>
                                            {formatDate(log.loginDate)}
                                        </TableCell>
                                        <TableCell>
                                            {log.logoutDate
                                                ? formatDate(log.logoutDate)
                                                : ''}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Layout>
    );
}

const formatDate = dateString => {
    const date = new Date(dateString);
    // convert string from iso to australian format:
    return date.toLocaleString('en-AU', {
        timeZone: 'Australia/Sydney',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};
