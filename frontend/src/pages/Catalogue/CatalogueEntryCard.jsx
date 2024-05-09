import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function CatalogueEntryCard({ item, assetFn }) {
    return (
        <Grid item sm='2' md='5' lg='4'>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140, backgroundSize: 'contain' }}
                    image={assetFn}
                    title={item.name}
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
