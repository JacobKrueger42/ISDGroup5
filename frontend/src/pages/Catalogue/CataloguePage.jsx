import {
    DefensiveMicrobotsUrl,
    HardlightAfterburnerUrl,
    HeadStompersUrl,
    LaserScopeUrl,
    Pocket_ICBMUrl,
    SpareDronePartsUrl
} from '#assets';
import { useAuth, useCatalogue } from '#hooks';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const { catalogue } = useCatalogue();

    const navigate = useNavigate();
    const { user } = useAuth();

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(!user);
    }, [user]);

    const onAddToCart = event => {
        event.preventDefault();

        if (disabled) {
            console.warn(
                'Not logged in! Cannot add to cart, will prompt user to login...'
            );
            navigate('/login');
        } else {
            const catalogueEntryId = event.target.id;
            console.log('Adding item to cart', catalogueEntryId);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                        disabled={disabled}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </Grid>
        </Box>
    );
}

function mockProductUrlRoulette() {
    return mockProductUrls.sort(() => 0.5 - Math.random())[0];
}
