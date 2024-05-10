import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Box
} from '@mui/material';
import { useAuth } from '#hooks';

export default function AccessLogPage() {
    const { getLogsAsync, getUserAsync } = useAuth();
    const [searchDate, setSearchDate] = useState('');
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        (async () => {
            const user = await getUserAsync();
            const logs = await getLogsAsync(user.id);
            // add index to logs
            const logsWithIndex = logs.map((log, index) => ({
                ...log,
                index: index + 1
            }));
            setLogs(logsWithIndex);
        })();
    }, []);

    const formatDate = dateString => {
        const date = new Date(dateString);
        // return string is iso format:
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

    const handleSearch = async () => {
        // only get the date part
        const formattedSearchDate = formatDate(searchDate).split(' ')[0];
        const filtered = logs.filter(log =>
            formatDate(log.loginDate).startsWith(formattedSearchDate)
        );
        setFilteredLogs(filtered);
        if (filtered.length === 0 && formattedSearchDate !== '') {
            setFilteredLogs([]);
        }
    };

    return (
        <>
            <Card
                sx={{
                    textAlign: 'left',
                    minWidth: '650px'
                }}
                style={{
                    marginTop: '150px'
                }}
            >
                <CardContent sx={{ textAlign: 'left' }}>
                    <Typography marginBottom='20px' variant='h5' gutterBottom>
                        My Access Logs
                    </Typography>
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
                        <Button variant='contained' onClick={handleSearch}>
                            Search
                        </Button>
                    </Box>
                </CardContent>
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
        </>
    );
}
