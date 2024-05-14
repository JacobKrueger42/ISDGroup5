import { SearchInput } from '#components';
import { Skeleton, Stack, Typography } from '@mui/material';

export function CatalgoueEntryManagementHeader({
    catalogue,
    searchTerm,
    setSearchTerm,
    isLoading
}) {
    return (
        <Stack spacing={2}>
            <Typography align='left' variant='body' color='text.secondary'>
                Here you can manage the catalogue entries tracked by the system.
                Catalogue entries listed here can be soft-deleted (archived),
                updated (stock + price), or added.
            </Typography>
            {isLoading ? (
                <Skeleton>
                    <SearchInput options={[]} />
                </Skeleton>
            ) : (
                <SearchInput
                    options={catalogue}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            )}
        </Stack>
    );
}
