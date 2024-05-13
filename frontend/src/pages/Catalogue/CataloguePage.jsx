import { Layout, SearchInput } from '#components';
import { useCatalogue } from '#hooks';
import { Grid, Skeleton } from '@mui/material';
import CatalogueProductEntryCard from './CatalogueProductEntryCard';

export default function CataloguePage() {
    const {
        catalogue,
        disableAddToCart,
        onAddToCart,
        searchTerm,
        setSearchTerm,
        isLoading
    } = useCatalogue();

    return (
        <Layout
            title='Catalogue'
            headerContent={
                <SearchHeader
                    isLoading={isLoading}
                    catalogue={catalogue}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            }
        >
            {isLoading ? (
                <Skeleton
                    animation='wave'
                    sx={{ marginTop: '4rem' }}
                    variant='rectangular'
                    width={1000}
                    height={600}
                />
            ) : (
                <Grid sx={{ marginTop: '4rem' }} container spacing={2}>
                    {catalogue.map((item, index) => (
                        <CatalogueProductEntryCard
                            item={item}
                            assetFn={item.assetFn}
                            key={index}
                            disabled={disableAddToCart}
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </Grid>
            )}
        </Layout>
    );
}

function SearchHeader({ isLoading, catalogue, searchTerm, setSearchTerm }) {
    return isLoading ? (
        <Skeleton
            variant='rounded'
            animation='wave'
            width={1000}
            height={100}
        />
    ) : (
        <SearchInput
            options={catalogue}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            label='Looking for something in particular?'
        />
    );
}
