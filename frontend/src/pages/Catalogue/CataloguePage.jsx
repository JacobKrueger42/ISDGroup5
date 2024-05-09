import {
    DefensiveMicrobotsUrl,
    HardlightAfterburnerUrl,
    HeadStompersUrl,
    LaserScopeUrl,
    Pocket_ICBMUrl,
    SpareDronePartsUrl
} from '#assets';
import { useProducts } from '#hooks';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CatalogueEntryCard from './CatalogueEntryCard';

const mockProductUrls = [
    LaserScopeUrl,
    DefensiveMicrobotsUrl,
    HeadStompersUrl,
    Pocket_ICBMUrl,
    HardlightAfterburnerUrl,
    SpareDronePartsUrl
];

export default function CataloguePage() {
    // const { catalogue } = useCatalogue();
    const { products } = useProducts();

    return (
        <Box sx={{ height: 800 }}>
            <Grid
                sx={{ flexGrow: 1 }}
                container
                spacing={2}
                alignItems='baseline'
                justifyContent='center'
            >
                {products.map((item, index) => (
                    <CatalogueEntryCard
                        item={item}
                        assetFn={mockProductUrlRoulette()}
                        key={index}
                    />
                ))}
            </Grid>
        </Box>
    );
}

function mockProductUrlRoulette() {
    return mockProductUrls.sort(() => 0.5 - Math.random())[0];
}
