import {
    DefensiveMicrobotsUrl,
    HardlightAfterburnerUrl,
    HeadStompersUrl,
    LaserScopeUrl,
    Pocket_ICBMUrl,
    SpareDronePartsUrl
} from '#assets';
import { useCatalogue } from '#hooks';
import { Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CatalogueProductEntryCard from './CatalogueProductEntryCard';
import { SearchInput } from '#components';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
        <PageLayout
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
        </PageLayout>
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

function PageLayout({ title, headerContent, children }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                marginTop: '4rem',
                justifyContent: 'space-between'
            }}
        >
            <Typography variant='h2' gutterBottom>
                {title}
            </Typography>

            <Card>
                <CardContent>{headerContent}</CardContent>
            </Card>

            {children}
        </div>
    );
}

function mockProductUrlRoulette() {
    return mockProductUrls.sort(() => 0.5 - Math.random())[0];
}
