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
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import CatalogueProductEntryCard from './CatalogueProductEntryCard';
import { SearchInput } from '#components';

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
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Card variant='outlined'>
                <CardHeader title='Catalogue' />

                {isLoading ? (
                    <Skeleton>
                        <SearchInput options={[]} />
                    </Skeleton>
                ) : (
                    <SearchInput
                        options={catalogue}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        label='Looking for something in particular?'
                    />
                )}
            </Card>
            <Card>
                <Grid
                    marginTop={10}
                    container
                    spacing={2}
                    alignItems='baseline'
                    justifyContent='center'
                >
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
            </Card>
        </Box>
    );
}

function mockProductUrlRoulette() {
    return mockProductUrls.sort(() => 0.5 - Math.random())[0];
}
