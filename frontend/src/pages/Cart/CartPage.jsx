import { Typography, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useCart } from '../../contexts/CartContext'; // Adjust the import path as necessary
import { Layout } from '#components'; // Ensure Layout is a reusable component that accepts children
import { bannerPlaceholder } from '#assets';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function CartPage() {
  const { cartItems, updateCartItem, removeCartItem } = useCart();

  const handleRemoveClick = (productId) => {
    removeCartItem(productId);
  };

  const handleQuantityChange = (event, productId) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      updateCartItem(productId, quantity);
    }
  };

  return (
    <Layout
      title="Your Cart"
      headerContent={<Typography variant="h4">Shopping Cart</Typography>}
      headerActions={<Actions />}
    >
      <img loading="lazy" src={bannerPlaceholder} alt="Shopping Cart Banner" style={{ width: '100%' }} />
      <List>
        {cartItems && cartItems.length > 0 ? ( // Ensure cartItems is checked
          cartItems.map(item => (
            <ListItem key={item.productId} divider>
              <ListItemText primary={item.name} secondary={`$${item.price}`} />
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, item.productId)}
                inputProps={{ min: 1, style: { width: '50px' } }}
              />
              <Button variant="contained" color="error" onClick={() => handleRemoveClick(item.productId)}>
                Remove
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography>Your cart is empty.</Typography>
        )}
      </List>
    </Layout>
  );
}

function Actions() {
  const navigate = useNavigate();

  return (
    <Button variant="contained" color="primary" onClick={() => navigate('/checkout')} style={{ marginLeft: 'auto' }}>
      Proceed to Checkout
    </Button>
  );
}