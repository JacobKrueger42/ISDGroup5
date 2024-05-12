import {
    DefensiveMicrobotsUrl,
    HardlightAfterburnerUrl,
    HeadStompersUrl,
    LaserScopeUrl,
    Pocket_ICBMUrl,
    SpareDronePartsUrl
} from '#assets';
import { Layout, SearchInput } from '#components';
import { useCatalogue } from '#hooks';
import { Grid, Skeleton } from '@mui/material';
import CatalogueProductEntryCard from './CatalogueProductEntryCard';

const mockProductUrls = [
    LaserScopeUrl,
    DefensiveMicrobotsUrl,
    HeadStompersUrl,
    Pocket_ICBMUrl,
    HardlightAfterburnerUrl,
    SpareDronePartsUrl
];

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
                            assetFn={mockProductUrlRoulette()}
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

function mockProductUrlRoulette() {
    return mockProductUrls.sort(() => 0.5 - Math.random())[0];
}
