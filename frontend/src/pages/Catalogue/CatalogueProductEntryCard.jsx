import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardHeader, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import InfoDialogue from './InfoDialogue';
import { useCart } from '#hooks';

export default function CatalogueProductEntryCard({
    item,
    assetFn,
    disabled
}) {
    const [isOpen, setOpen] = useState(false);
    const { addToCart } = useCart();

    return (
        <Grid item sm={2} md={5} lg={4}>
            <InfoDialogue
                open={isOpen}
                onClose={() => setOpen(false)}
                title={item.name}
                upc={item.uniqueProductCode}
                quantity={item.quantity}
            />
            <Card sx={{ maxWidth: 345 }} variant='outlined'>
                <CardHeader
                    title={item.name}
                    subheader={
                        <Chip
                            label={item.category}
                            color='secondary'
                            variant='outlined'
                            icon={<CategoryIcon />}
                            size='small'
                        />
                    }
                    action={
                        <IconButton onClick={() => setOpen(true)}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <CardMedia
                    sx={{ height: 140, backgroundSize: 'contain' }}
                    image={assetFn}
                    title={item.name}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' align='left'>
                        {}
                    </Typography>

                    <Typography
                        variant='body2'
                        color='text.secondary'
                        align='left'
                    >
                        {item.description}
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        fontSize='1.25rem'
                        align='right'
                    >
                        ${item.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        disabled={disabled}
                        size='small'
                        id={item.id}
                        variant='contained'
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => addToCart(item)}
                    >
                        Add to cart
                    </Button>
                    <Button
                        size='small'
                        target='_blank'
                        component='a'
                        href='https://riskofrain2.fandom.com/wiki/Risk_of_Rain_2_Wiki'
                    >
                        {item.brandName}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
