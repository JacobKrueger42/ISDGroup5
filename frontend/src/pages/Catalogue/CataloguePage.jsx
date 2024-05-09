import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useProducts } from '#hooks';

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
                    <CatalogueItem item={item} key={index} />
                ))}
            </Grid>
        </Box>
    );
}

function CatalogueItem({ item }) {
    return (
        <Grid item lg='auto'>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image='/static/images/cards/contemplative-reptile.jpg'
                    title='green iguana'
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' align='left'>
                        {item.name}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        align='left'
                    >
                        {item.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size='small'
                        variant='contained'
                        startIcon={<AddShoppingCartIcon />}
                    >
                        Add to cart
                    </Button>
                    <Button size='small'>{item.brandName}</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
