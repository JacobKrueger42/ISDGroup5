import { Layout } from '#components';
import { useCatalogue } from '#hooks';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Stack,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CatalogueDetailPage() {
    const { catalogueId } = useParams();
    const [entry, setEntry] = useState({ name: 'loading...' });
    const {
        catalogue,
        isLoading,
        getCatalogueEntry,
        disableAddToCart,
        onAddToCart
    } = useCatalogue();

    useEffect(() => {
        if (isLoading) return;
        setEntry(getCatalogueEntry(catalogueId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catalogueId, catalogue, isLoading]);

    return (
        <Layout
            title={entry?.name ?? 'loading...'}
            headerContent={
                <Stack direction='row' gap='4rem' marginTop='4rem'>
                    <Typography variant='body' color='text.secondary'>
                        {entry?.description ?? 'loading...'}
                    </Typography>

                    <List>
                        <ListItem>
                            <ListItemText
                                primary='Unique Product Code (UPC)'
                                secondary={
                                    entry?.uniqueProductCode ?? 'loading...'
                                }
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemText
                                primary='Current Stock Level'
                                secondary={entry?.quantity ?? 'loading...'}
                            />
                        </ListItem>
                    </List>

                    <Chip
                        sx={{
                            width: '10rem',
                            position: 'relative',
                            top: '-4rem',
                            left: '4rem'
                        }}
                        label={entry?.category ?? 'loading...'}
                        color='secondary'
                        variant='outlined'
                        icon={<CategoryIcon />}
                        size='small'
                    />
                </Stack>
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
                <Card variant='outlined'>
                    <CardMedia
                        sx={{ height: 140, backgroundSize: 'contain' }}
                        image={entry?.assetFn ?? 'loading...'}
                        title={entry?.name ?? 'loading...'}
                    />
                    <CardContent>
                        <Typography
                            variant='subtitle2'
                            fontSize='1.25rem'
                            align='right'
                        >
                            ${entry?.price ?? 'loading...'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            disabled={disableAddToCart}
                            size='small'
                            id={entry?.id ?? -1}
                            variant='contained'
                            startIcon={<AddShoppingCartIcon />}
                            onClick={onAddToCart}
                        >
                            Add to cart
                        </Button>
                        <Button
                            size='small'
                            target='_blank'
                            component='a'
                            href='https://riskofrain2.fandom.com/wiki/Risk_of_Rain_2_Wiki'
                        >
                            {entry?.brandName ?? 'loading...'}
                        </Button>
                    </CardActions>
                </Card>
            )}
        </Layout>
    );
}
