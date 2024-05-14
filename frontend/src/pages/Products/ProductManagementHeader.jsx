import { SearchInput } from '#components';
import { Skeleton, Stack, Typography } from '@mui/material';

export function ProductManagementHeader({
    products,
    searchTerm,
    setSearchTerm,
    isLoading
}) {
    return (
        <Stack spacing={2}>
            <Typography align='left' variant='body' color='text.secondary'>
                Here you can manage products tracked by the system. Products
                listed here can be added to the public product catalogue.
            </Typography>
            {isLoading ? (
                <Skeleton>
                    <SearchInput options={[]} />
                </Skeleton>
            ) : (
                <SearchInput
                    options={products}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            )}
        </Stack>
    );
}
